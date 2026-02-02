import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-3xl mb-4">Karma Kloth</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Solving the clothing crisis through creativity and storytelling.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Connect
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-2">
              Follow our journey
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Karma Kloth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
