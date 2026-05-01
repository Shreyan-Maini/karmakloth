import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Support Us
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-3">
              Help power Karma Kloth
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Donate directly below.
            </p>
          </div>

          <div className="border border-border bg-background overflow-hidden">
            <iframe
              title="Karma Kloth donation form"
              src="https://hcb.hackclub.com/donations/start/karma-kloth"
              className="w-full h-[900px]"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
