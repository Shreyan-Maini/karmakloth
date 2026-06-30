"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Mail } from "lucide-react";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

const chapters = [
  {
    school: "Michigan State University",
    abbreviation: "MSU",
    accentColor: "#ffffff",
    lead: "Krishna Shastri",
    role: "Chapter Lead",
    email: "shastri5@msu.edu",
    logo: "/miscellaneous/msu.png",
  },
  {
    school: "University of Michigan",
    abbreviation: "UM",
    accentColor: "#00274C",
    lead: "Ansh Malhotra",
    role: "Chapter Lead",
    email: "anshmalh@umich.edu",
    logo: "/miscellaneous/umich.png",
  },
  {
    school: "Wayne State University",
    abbreviation: "WSU",
    accentColor: "#0C5449",
    lead: "Mohon Chowdhury",
    role: "Chapter Lead",
    email: "mohonch12@gmail.com",
    logo: "/miscellaneous/wayne.png",
  },
] as const;

function ChapterLogo({ logo, abbreviation, accentColor }: { logo: string; abbreviation: string; accentColor: string }) {
  return (
    <div
      className="w-24 h-24 flex items-center justify-center rounded-full mb-6 overflow-hidden"
      style={{ backgroundColor: accentColor }}
    >
      <img
        src={logo}
        alt={`${abbreviation} logo`}
        className="w-16 h-16 object-contain"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const span = document.createElement("span");
            span.className = "text-2xl font-serif font-bold text-white tracking-wider";
            span.textContent = abbreviation;
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );
}

export default function ChaptersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Our Network
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Chapters across Michigan
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              KarmaKloth is growing on campuses throughout Michigan. Connect with
              your local chapter to get involved, host drives, and build community.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Established Chapters
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Find your campus
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <AnimatedSection key={chapter.abbreviation} delay={100 + index * 100}>
                <div className="bg-background p-10 flex flex-col items-center text-center h-full">
                  <ChapterLogo
                    logo={chapter.logo}
                    abbreviation={chapter.abbreviation}
                    accentColor={chapter.accentColor}
                  />

                  <h3 className="font-serif text-2xl text-foreground mb-1">
                    {chapter.school}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8 tracking-wide">
                    {chapter.abbreviation} Chapter
                  </p>

                  <div className="mt-auto border-t border-border w-full pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Chapter Lead</p>
                    <p className="font-serif text-lg text-foreground mb-3">
                      {chapter.lead}
                    </p>
                    <a
                      href={`mailto:${chapter.email}`}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      {chapter.email}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Start a Chapter CTA */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Bring KarmaKloth to your campus
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Interested in starting a chapter at your university? We'd love to
              help you get organized, run drives, and make an impact in your community.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
