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

const impactStats = [
  {
    number: 18000,
    suffix: "+",
    label: "Clothing Items Donated",
    description: "Pieces of clothing collected and distributed to communities in need",
  },
  {
    number: 3,
    suffix: "",
    label: "Partner Organizations",
    description: "Local and international partners helping us expand our reach",
  },
  {
    number: 500,
    suffix: "+",
    label: "Families Supported",
    description: "Families who have received clothing through our programs",
  },
  {
    number: 25,
    suffix: "",
    label: "Events Hosted",
    description: "Clothing drives, workshops, and community events organized",
  },
];

const stories = [
  {
    quote:
      "Karma Kloth helped our community center provide winter clothing to over 100 families last season. The impact was immediate and meaningful.",
    author: "Community Partner",
    location: "Local Community Center",
  },
  {
    quote:
      "The sustainable fashion workshop changed how our students think about clothing and waste. It was educational and inspiring.",
    author: "School Administrator",
    location: "High School Program",
  },
  {
    quote:
      "Working with Karma Kloth has allowed us to extend our reach to communities we could not serve before. Their dedication is remarkable.",
    author: "NGO Director",
    location: "International Partner",
  },
];

const goals = [
  {
    title: "100,000 Items by 2027",
    description:
      "We aim to collect and distribute 10,000 pieces of clothing by the end of 2027.",
    progress: 25,
  },
  {
    title: "Global Expansion",
    description:
      "Establish partnerships in 10 new countries, focusing on South Asian communities.",
    progress: 60,
  },
  
];

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

      {/* Stats Section */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {impactStats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl mb-2">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{stat.label}</h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Voices of Impact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Stories from our community
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <AnimatedSection key={story.author} delay={100 + index * 100}>
                <div className="bg-secondary p-8 h-full flex flex-col">
                  <blockquote className="font-serif text-lg italic text-foreground leading-relaxed flex-1 mb-6">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-medium text-foreground">{story.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {story.location}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Looking Forward
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Our Goals
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {goals.map((goal, index) => (
              <AnimatedSection key={goal.title} delay={100 + index * 100}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-2xl mb-2 text-foreground">
                        {goal.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {goal.description}
                      </p>
                    </div>
                    <span className="text-2xl font-serif text-accent">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
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
                href="/events"
                className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
              >
                View Events
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
