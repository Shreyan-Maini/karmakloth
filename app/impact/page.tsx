"use client";

import React from "react"

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useEffect, useRef, useState } from "react";

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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const impactEvents = [
  {
    title: "First Clothing Drive",
    date: "June 1–8, 2024",
    highlight: "~600 articles",
    description: "Our first community clothing drive.",
  },
  {
    title: "Toy and Clothing Drive",
    date: "Oct 21 – Nov 11, 2024",
    highlight: "~700 articles (toys + clothes)",
    description: "Combined toy and clothing collection for families in need.",
  },
  {
    title: "Sterling Heights Community Networking Event",
    date: "March 7, 2025",
    highlight: "Community event",
    description: "Connected with local partners and community leaders.",
  },
  {
    title: "Troy CC Clothing Drive",
    date: "May 19–27, 2025",
    highlight: "~500 donations",
    description: "Clothing donations collected with community support.",
  },
  {
    title: "Brandy 5K",
    date: "August 15, 2025",
    highlight: "~$4k raised",
    description: "Proceeds went to the American Foundation for Suicide Prevention.",
  },
  {
    title: "MSU Clothing Drive",
    date: "Nov 1–8, 2025",
    highlight: "~8k articles",
    description: "Large-scale campus clothing drive and collection.",
  },
  {
    title: "WSU Clothing Drive",
    date: "Dec 1–5, 2025",
    highlight: "~595 articles",
    description: "Campus clothing drive supporting community distribution.",
  },
] as const;

const listedDriveArticlesTotal = 600 + 700 + 500 + 8000 + 595; // excludes the networking event (no count) and the 5K ($ raised)
const listedFundsRaisedTotal = 4000;

const upcomingEvents = [
  {
    title: "No upcoming events",
    date: "Check back soon",
    description:
      "We’re planning our next drive and community events now. Follow along and check back for dates and locations.",
  },
] as const;

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Our Impact
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Creating change, one piece at a time
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every donation, every event, every partnership brings us closer to
              solving the clothing crisis and uplifting communities worldwide.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              On-the-ground Impact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Recent drives & events
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactEvents.map((event, index) => (
              <AnimatedSection key={event.title} delay={100 + index * 75}>
                <div className="bg-secondary p-8 h-full">
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-serif text-2xl text-accent whitespace-nowrap">
                        {event.highlight}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={650}>
            <div className="mt-12 bg-foreground text-primary-foreground p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-3">
                    Totals (events listed above)
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight">
                    <AnimatedCounter target={listedDriveArticlesTotal} suffix="+" />{" "}
                    articles collected
                  </h3>
                </div>
                <div className="md:text-right">
                  <p className="text-primary-foreground/70 text-sm mb-2">
                    Funds raised (Brandy 5K)
                  </p>
                  <p className="font-serif text-3xl md:text-4xl">
                    ${listedFundsRaisedTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming-events" className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Mark Your Calendar
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Upcoming events
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <AnimatedSection key={event.title} delay={100 + index * 100}>
                <div className="bg-background p-8 md:p-12">
                  <p className="text-sm text-accent mb-3">{event.date}</p>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4 text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-foreground text-balance">
              Be part of our impact
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Your support helps us reach more communities and create lasting
              change. Join us in making a difference.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300"
              >
                Get Involved
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
              >
                In Action
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
