"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type NavItem =
  | { href: string; label: string; children?: never }
  | { href: string; label: string; children: { href: string; label: string }[] };

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/drop", label: "Drop" },
  { href: "/support", label: "Support Us" },
  {
    href: "/team",
    label: "Team",
    children: [{ href: "/chapters", label: "Chapters" }],
  },
  { href: "/gallery", label: "Gallery" },
  {
    href: "/impact",
    label: "Impact",
    children: [
      { href: "/impact", label: "Impact" },
      { href: "/upcoming-events", label: "Upcoming Events" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

function DropdownItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <li ref={ref} className="relative list-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <Link
          href={item.href}
          className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
          onClick={() => setOpen(false)}
        >
          {item.label}
        </Link>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[160px] bg-background border border-border shadow-md z-50"
          onMouseLeave={() => setOpen(false)}
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Karma Kloth home"
        >
          <span className="relative w-11 h-11 overflow-visible">
            <Image
              src="/KarmaKlothLogoNoBG.png"
              alt="Karma Kloth"
              fill
              className="object-contain scale-[1.75] origin-left"
              priority
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <DropdownItem key={link.href} item={link} />
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.children ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.href ? null : link.href
                          )
                        }
                        className="p-1 text-muted-foreground"
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileExpanded === link.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {mobileExpanded === link.href && (
                      <ul className="mt-2 pl-4 flex flex-col gap-3 border-l border-border">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileExpanded(null);
                              }}
                              className="block text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
