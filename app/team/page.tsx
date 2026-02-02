"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

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
            entry.target.classList.add(
              "animate-in",
              "fade-in",
              "slide-in-from-bottom-8"
            );
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

function TeamImage({
  src,
  alt,
  fallbackLetter,
}: {
  src?: string;
  alt: string;
  fallbackLetter: string;
}) {
  if (!src) {
    return (
      <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
        <span className="text-6xl font-serif text-foreground/20">
          {fallbackLetter}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
}

const founders: Array<{
  name: string;
  role: string;
  bio: string;
  image?: string;
}> = [
  {
    name: "Ansh Malhotra",
    role: "Co-Founder",
    bio: "Passionate about sustainable fashion and community impact. Leading the vision to transform how we think about clothing and giving.",
    // You don't have ansh in the screenshot, so this will show the "A" placeholder.
    image: "/team/ansh.jpg",
  },
  {
    name: "Krishna Shastri",
    role: "Co-Founder",
    bio: "Dedicated to building meaningful connections between communities globally. Overseeing operations and partnerships.",
    image: "/team/krishna.jpg",
  },
];

const executiveBoard: Array<{
  name: string;
  role: string;
  image?: string;
}> = [
  { name: "Samuel Vu", role: "Board Chair", image: "/team/sam.JPG" },
  { name: "Mikaela Espinoza", role: "Fundraising Chair", image: "/team/mikaela.jpeg" },
  { name: "Mina Atto", role: "Event Chair", image: "/team/mina.jpeg" },
  { name: "Jonah Necklace", role: "Expansion Chair", image: "/team/jonah.jpeg" },
  { name: "Taali Mohindra", role: "Creative Design Chair", image: "/team/taali.jpeg" },
  { name: "Mohon Chowdhury", role: "Creative Design Chair", image: "/team/mohon.jpg" },
  { name: "Raul Oraha", role: "Social Media Chair", image: "/team/raul.JPG" },
  { name: "Shreyan Maini", role: "Secondary Board Chair", image: "/team/shreyan.jpg" },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Our Team
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              The people behind the mission
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              United by a shared vision to solve the clothing crisis through
              creativity, compassion, and community.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Leadership
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Founders
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <AnimatedSection key={founder.name} delay={100 + index * 100}>
                <div className="group">
                  <div className="aspect-[4/5] bg-muted mb-6 overflow-hidden">
                    <TeamImage
                      src={founder.image}
                      alt={founder.name}
                      fallbackLetter={founder.name.charAt(0)}
                    />
                  </div>

                  <h3 className="font-serif text-2xl mb-2 text-foreground">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-accent mb-4 tracking-wide">
                    {founder.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Board Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Leadership
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16">
              Executive Board
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {executiveBoard.map((member, index) => (
              <AnimatedSection
                key={`${member.name}-${member.role}`}
                delay={100 + index * 50}
              >
                <div className="group">
                  <div className="aspect-square bg-secondary mb-4 overflow-hidden">
                    <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-300">
                      <TeamImage
                        src={member.image}
                        alt={member.name}
                        fallbackLetter={member.name.charAt(0)}
                      />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Want to join our team?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              We are always looking for passionate individuals who want to make
              a difference in the world through fashion and community impact.
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
