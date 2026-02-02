"use client";

import React from "react"

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowRight, Heart, Globe, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

    if (ref.current) {
      observer.observe(ref.current);
    }

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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Clothing with Purpose
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Solving the clothing crisis through creativity
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Combining donations with our own clothing that funds impact,
              inspires change, and uplifts communities in need.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300"
              >
                Get Involved
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/impact"
                className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
              >
                See Our Impact
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={500} className="mt-16">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Scroll to explore</span>
            <div className="w-px h-8 bg-border animate-pulse" />
          </div>
        </AnimatedSection>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Mission
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground max-w-4xl text-balance">
              Help solve the clothing crisis through creativity and storytelling
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <AnimatedSection delay={200}>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-foreground">Donations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every piece of clothing donated directly supports communities in
                  need, creating tangible impact where it matters most.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-foreground">Global Reach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spreading our mission internationally, with a special focus on
                  South Asian communities and beyond.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-foreground">Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building connections through frequent clothing drives, workshops,
                  and community engagement events.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Our Approach
                </p>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-8 text-balance">
                  Clothing that funds impact, inspires change
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We believe in a dual approach: accepting donations to directly help
                  those in need, while creating our own clothing line where proceeds
                  fund greater impact. This sustainable model allows us to grow our
                  reach and deepen our commitment to communities worldwide.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-foreground text-sm tracking-wide group"
                >
                  View Upcoming Events
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={200}>
              <div className="bg-secondary p-12 lg:p-16">
                <ul className="space-y-6">
                  {[
                    "Frequent clothing drives in local communities",
                    "Interactive workshops on sustainable fashion",
                    "Partnership programs with international organizations",
                    "Youth engagement and education initiatives",
                    "Seasonal collection launches for impact funding",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-balance">
              Join us in making a difference
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Whether through donations, volunteering, or spreading the word,
              every action counts toward solving the clothing crisis.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 border border-primary-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground hover:text-foreground transition-colors duration-300"
              >
                Meet the Team
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
