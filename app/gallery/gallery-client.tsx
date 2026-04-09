"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
            entry.target.classList.add(
              "animate-in",
              "fade-in",
              "slide-in-from-bottom-8"
            );
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }, delay);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
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

function isProbablyPortrait(width?: number, height?: number) {
  if (!width || !height) return false;
  return height / width > 1.2;
}

export function GalleryClient({
  images,
}: {
  images: Array<{ src: string; name: string; width?: number; height?: number }>;
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const safeImages = useMemo(() => images.filter((i) => i?.src), [images]);

  const active = safeImages[activeIdx];

  const openAt = (idx: number) => {
    setActiveIdx(idx);
    setOpen(true);
  };

  const prev = () =>
    setActiveIdx((i) => (i - 1 + safeImages.length) % safeImages.length);

  const next = () =>
    setActiveIdx((i) => (i + 1) % safeImages.length);

  useEffect(() => {
    if (!open || safeImages.length <= 1) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <AnimatedSection delay={150}>
        <div className="bg-secondary p-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Gallery
          </p>
          <h2 className="mb-3 font-serif text-3xl text-foreground md:text-4xl">
            No photos yet
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
            Add images to{" "}
            <span className="font-medium text-foreground">public/gallery/</span>{" "}
            and refresh. Supported formats: jpg, jpeg, png, webp.
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {safeImages.map((img, idx) => {
          const portrait = isProbablyPortrait(img.width, img.height);

          return (
            <AnimatedSection key={img.src} delay={100 + idx * 45}>
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="group relative w-full overflow-hidden bg-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-label={`Open photo ${idx + 1}`}
              >
                <div
                  className={`relative w-full ${
                    portrait ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.name.replace(/\.(png|jpg|jpeg|webp)$/i, "")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    priority={idx < 6}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <div className="inline-flex translate-y-2 items-center gap-2 bg-background/80 px-3 py-2 text-xs tracking-wide text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View
                  </div>
                </div>
              </button>
            </AnimatedSection>
          );
        })}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-foreground/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />

          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 focus:outline-none">
            <Dialog.Title className="sr-only">
              {active
                ? `Viewing ${active.name.replace(/\.(png|jpg|jpeg|webp)$/i, "")}`
                : "Gallery image preview"}
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              Use the close button to exit the image preview. If multiple images
              are available, use the previous and next buttons or arrow keys to
              navigate.
            </Dialog.Description>

            <div className="relative w-full max-w-5xl">
              <div className="overflow-hidden border border-border bg-background shadow-2xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="truncate text-sm text-muted-foreground">
                    {active ? active.name : ""}
                  </p>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="relative w-full bg-secondary">
                  <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                    {active ? (
                      <Image
                        src={active.src}
                        alt={active.name.replace(/\.(png|jpg|jpeg|webp)$/i, "")}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-contain"
                        priority
                      />
                    ) : null}
                  </div>

                  {safeImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 backdrop-blur transition-colors hover:bg-background"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={next}
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 backdrop-blur transition-colors hover:bg-background"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
