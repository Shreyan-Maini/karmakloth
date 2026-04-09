import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { GalleryClient } from "./gallery-client";
import fs from "node:fs/promises";
import path from "node:path";

type GalleryImage = { src: string; name: string; width?: number; height?: number };

async function getGalleryImages(): Promise<GalleryImage[]> {
  const dir = path.join(process.cwd(), "public", "gallery");

  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const images = entries
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((name) => ({ name, src: `/gallery/${name}` }));

  return images;
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-14 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Gallery
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
            Moments that move the mission
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A minimal archive of drives, events, and community stories.
          </p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <GalleryClient images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

