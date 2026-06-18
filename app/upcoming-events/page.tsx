"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MapPin, Clock } from "lucide-react";

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

const upcomingEvents = [
  {
    title: "Panera Fundraiser",
    date: "July 10, 2026",
    time: "4:00 – 8:00 PM",
    location: "36808 Van Dyke Avenue",
    description:
      "Dine at Panera and a portion of your purchase goes directly to KarmaKloth. Bring friends and family — the more the merrier. Show this flyer or mention KarmaKloth when you order.",
  },
  {
    title: "Charity Bowling Fundraiser",
    date: "July 24, 2026",
    time: "6:00 – 8:00 PM",
    location: "Sterling Lanes",
    description:
      "Strike it for a cause! Join us for a fun evening of bowling with all proceeds benefiting our clothing aid programs. Open to all ages — bring your crew and make a difference.",
  },
];

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Mark Your Calendar
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Upcoming events
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Come out, have fun, and help us make a difference. Every event
              raises funds and awareness for communities in need.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {upcomingEvents.map((event, index) => (
            <AnimatedSection key={event.title} delay={100 + index * 120}>
              <div className="bg-background p-10 md:p-14">
                <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
                  {event.date}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  {event.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-xl">
                  {event.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0 text-accent" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0 text-accent" />
                    {event.location}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Questions? Get in touch.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Reach out if you want more details about an event or want to help
              us organize.
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
