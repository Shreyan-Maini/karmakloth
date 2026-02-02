"use client";

import React from "react"

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useEffect, useRef } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

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

const upcomingEvents = [
  {
    title: "No Upcoming Events",
  },
];

const pastEvents = [
  {
    title: "Winter Collection Launch",
    date: "December 2025",
    description:
      "Launched our winter collection with proceeds going directly to warming communities in need.",
  },
  {
    title: "Holiday Clothing Drive",
    date: "November 2025",
    description:
      "Collected over 2,000 pieces of clothing for families during the holiday season.",
  },
  {
    title: "Youth Workshop Series",
    date: "October 2025",
    description:
      "Engaged 150+ students in learning about sustainable fashion and community impact.",
  },
  {
    title: "International Partnership Summit",
    date: "September 2025",
    description:
      "Established partnerships with organizations across South Asia to expand our reach.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Events
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Join us in making a difference
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From clothing drives to workshops, our events bring communities
              together to create lasting impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Mark Your Calendar
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Upcoming Events
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <AnimatedSection key={event.title} delay={100 + index * 100}>
                <div className="bg-background p-8 md:p-12 group hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="lg:w-1/4">
                      <span className="inline-block text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 mb-4">
                        {event.type}
                      </span>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-3/4">
                      <h3 className="font-serif text-2xl md:text-3xl mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {event.description}
                      </p>
                      <button
                        type="button"
                        className="text-sm text-foreground border-b border-foreground pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Journey
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Past Events
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {pastEvents.map((event, index) => (
              <AnimatedSection key={event.title} delay={100 + index * 100}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-accent rounded-full md:-translate-x-1/2 -translate-x-1" />

                  {/* Content */}
                  <div
                    className={`md:w-1/2 pl-8 md:pl-0 ${
                      index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                    }`}
                  >
                    <p className="text-sm text-accent mb-2">{event.date}</p>
                    <h3 className="font-serif text-xl mb-2 text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Want to host an event?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Partner with us to organize a clothing drive, workshop, or
              community event in your area.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300"
            >
              Contact Us
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
