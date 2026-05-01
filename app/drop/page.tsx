"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
    <div ref={ref} className={`opacity-0 translate-y-8 duration-700 ease-out ${className}`}>
      {children}
    </div>
  );
}

const DROP = {
  title: "First Drop",
  subtitle: "A limited release is coming soon.",
  // Update this when you have a date/time.
  releaseAtISO: "2026-07-01T16:00:00Z",
  // Put your design images at:
  // - public/drop/left.png
  // - public/drop/right.png
  // (or change the filenames here)
  leftDesignSrc: "/drop/left.png",
  rightDesignSrc: "/drop/right.png",
} as const;

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function DesignSlot({
  src,
  isLive,
  onMissing,
}: {
  src: string;
  isLive: boolean;
  onMissing: () => void;
}) {
  return (
    <div className="relative bg-violet-50/65 backdrop-blur-md border border-violet-200/70 p-5 md:p-6 shadow-[0_0_0_1px_rgba(125,89,255,0.12),0_20px_50px_rgba(111,76,255,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-300/25 via-fuchsia-200/10 to-secondary/50" />
      <div className="relative h-6 overflow-hidden mb-4">
        <div className="drop-marquee absolute inset-y-0 left-0 w-full">
          <div className="drop-marquee-track">
            <span className="drop-coming-soon-item text-xs uppercase tracking-[0.28em] text-foreground/70 whitespace-nowrap">
              DROP Coming Soon
            </span>
            <span className="drop-coming-soon-item text-xs uppercase tracking-[0.28em] text-foreground/70 whitespace-nowrap">
              DROP Coming Soon
            </span>
            <span className="drop-coming-soon-item text-xs uppercase tracking-[0.28em] text-foreground/70 whitespace-nowrap">
              DROP Coming Soon
            </span>
            <span className="drop-coming-soon-item text-xs uppercase tracking-[0.28em] text-foreground/70 whitespace-nowrap">
              DROP Coming Soon
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-violet-100/55 border border-violet-200/70">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 1024px) 40vw, 420px"
          className={`object-contain transition duration-500 ${
            isLive ? "blur-0" : "blur-sm scale-[1.02]"
          }`}
          onError={onMissing}
        />
        {!isLive ? (
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-4">
              <div className="inline-flex items-center gap-2 bg-background/85 text-foreground backdrop-blur px-3 py-2 text-xs tracking-wide border border-border/70">
                Preview locked
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EmptySlot({ filename }: { filename: string }) {
  return (
    <div className="relative bg-violet-50/65 backdrop-blur-md border border-violet-200/70 p-5 md:p-6 shadow-[0_0_0_1px_rgba(125,89,255,0.12),0_20px_50px_rgba(111,76,255,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-300/25 via-fuchsia-200/10 to-secondary/50" />
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/70 mb-4">
        Design slot
      </p>
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-violet-100/55 border border-violet-200/70 flex items-center justify-center p-6 text-center">
        <div className="w-full border border-dashed border-border bg-background/75 backdrop-blur px-6 py-8">
          <p className="font-serif text-2xl text-foreground mb-2">Add a design</p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Put your image at{" "}
            <span className="font-medium text-foreground">
              public/drop/{filename}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DropPage() {
  const releaseAt = useMemo(() => new Date(DROP.releaseAtISO).getTime(), []);
  const [now, setNow] = useState(() => Date.now());
  const [leftReady, setLeftReady] = useState(true);
  const [rightReady, setRightReady] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const msLeft = releaseAt - now;
  const isLive = msLeft <= 0;
  const countdown = formatCountdown(msLeft);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-[calc(100vh-80px)] pt-28 pb-20 px-6 overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50/70 to-background text-foreground">
        {/* Blurred / locked background */}
        <div className="absolute inset-0 -z-10">
          {/* Always-visible blurred glow (no image required) */}
          <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[70rem] h-[40rem] bg-violet-100/80 blur-3xl" />
          <div className="absolute -top-32 left-[-8rem] w-[34rem] h-[34rem] bg-violet-300/70 blur-3xl" />
          <div className="absolute top-28 right-[-8rem] w-[36rem] h-[36rem] bg-fuchsia-300/60 blur-3xl" />
          <div className="absolute -bottom-64 left-[-10rem] w-[40rem] h-[40rem] bg-violet-400/30 blur-3xl" />
          <div className="absolute -bottom-72 right-[-12rem] w-[44rem] h-[44rem] bg-purple-200/90 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full border border-border/70 blur-sm opacity-40" />
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] rounded-full border border-violet-300/60 blur-sm opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(170,110,255,0.34),transparent_45%)]" />

          {/* If design images exist, softly blur them into the background */}
          <Image
            src={DROP.leftDesignSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover scale-110 blur-3xl opacity-10"
            priority
          />
          <Image
            src={DROP.rightDesignSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover scale-110 blur-3xl opacity-8"
            priority
          />

          <div className="absolute inset-0 bg-violet-50/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50/15 via-violet-100/30 to-background/65" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <AnimatedSection delay={100} className="hidden lg:block">
              {leftReady ? (
                <DesignSlot
                  src={DROP.leftDesignSrc}
                  isLive={isLive}
                  onMissing={() => setLeftReady(false)}
                />
              ) : (
                <EmptySlot filename="left.png" />
              )}
            </AnimatedSection>

            <div className="lg:pt-8">
              <AnimatedSection>
                <div className="text-center">
                  <p className="text-sm uppercase tracking-[0.32em] text-accent mb-6">
                    Drop
                  </p>

                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-4 text-balance">
                    {DROP.title}
                  </h1>

                  <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
                    {DROP.subtitle}
                  </p>

                  <div className="inline-flex items-center px-4 py-2 rounded-full border border-violet-300/60 bg-violet-100/65 text-violet-900 text-xs uppercase tracking-[0.2em]">
                    Drops July 1st
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <div className="relative bg-violet-50/70 backdrop-blur-md border border-violet-300/70 p-8 md:p-10 text-center shadow-[0_0_0_1px_rgba(125,89,255,0.12),0_30px_80px_rgba(111,76,255,0.18)]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-300/35 via-fuchsia-200/25 to-transparent" />
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                    {isLive ? "Now live" : "Releases in"}
                  </p>

                  {isLive ? (
                    <div className="space-y-4">
                      <p className="font-serif text-3xl md:text-4xl text-foreground">It’s here.</p>
                      <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        The designs are now unblurred.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                      {[
                        { label: "Days", value: countdown.days },
                        { label: "Hours", value: countdown.hours },
                        { label: "Min", value: countdown.minutes },
                        { label: "Sec", value: countdown.seconds },
                      ].map((item) => (
                        <div key={item.label} className="relative">
                          <div className="font-serif text-3xl md:text-4xl text-foreground tabular-nums">
                            {item.value.toString().padStart(2, "0")}
                          </div>
                          <div className="text-[11px] tracking-wide text-muted-foreground mt-1">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={100} className="hidden lg:block">
              {rightReady ? (
                <DesignSlot
                  src={DROP.rightDesignSrc}
                  isLive={isLive}
                  onMissing={() => setRightReady(false)}
                />
              ) : (
                <EmptySlot filename="right.png" />
              )}
            </AnimatedSection>
          </div>

          {/* Mobile / tablet design slots */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
            <AnimatedSection delay={100}>
              {leftReady ? (
                <DesignSlot
                  src={DROP.leftDesignSrc}
                  isLive={isLive}
                  onMissing={() => setLeftReady(false)}
                />
              ) : (
                <EmptySlot filename="left.png" />
              )}
            </AnimatedSection>
            <AnimatedSection delay={150}>
              {rightReady ? (
                <DesignSlot
                  src={DROP.rightDesignSrc}
                  isLive={isLive}
                  onMissing={() => setRightReady(false)}
                />
              ) : (
                <EmptySlot filename="right.png" />
              )}
            </AnimatedSection>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @keyframes drop-coming-soon-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .drop-marquee {
          display: flex;
          align-items: center;
        }

        .drop-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: drop-coming-soon-marquee 8s linear infinite;
        }

        .drop-coming-soon-item {
          margin-right: 2.25rem;
        }
      `}</style>

      <Footer />
    </main>
  );
}

