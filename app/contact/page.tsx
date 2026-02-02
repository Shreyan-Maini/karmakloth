"use client";

import React from "react"

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Contact
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
              Let&apos;s connect
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you want to donate, volunteer, partner, or just learn more
              about our mission, we would love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <AnimatedSection>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Get in Touch
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-8">
                  We are here to help
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <p className="text-muted-foreground leading-relaxed mb-12">
                  Have questions about our programs, want to organize a clothing
                  drive in your community, or interested in partnering with us?
                  Reach out and we will get back to you as soon as possible.
                </p>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection delay={200}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:"
                        className="text-muted-foreground hover:text-accent transition-colors duration-300"
                      >
                        hello@karmakloth.org
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Serving communities worldwide
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Form */}
            <AnimatedSection delay={200}>
              <div className="bg-background p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-foreground">
                      Message Sent
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We will get back to you soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-sm text-accent hover:text-accent/80 transition-colors duration-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="donation">Make a Donation</option>
                        <option value="volunteer">Volunteer with Us</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="event">Host an Event</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none"
                        placeholder="How can we help?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 text-center">
              Common Questions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-16 text-center">
              How you can help
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                question: "How can I donate clothing?",
                answer:
                  "You can donate clothing at any of our scheduled clothing drives, or contact us to arrange a pickup for larger donations. We accept gently used clothing in good condition.",
              },
              {
                question: "Can I volunteer with Karma Kloth?",
                answer:
                  "Absolutely! We are always looking for passionate volunteers to help with events, outreach, and administrative tasks. Fill out the form above and select 'Volunteer with Us' to get started.",
              },
              {
                question: "How can my organization partner with you?",
                answer:
                  "We welcome partnerships with schools, businesses, and other nonprofits. Contact us to discuss collaboration opportunities that align with our mission.",
              },
              {
                question: "Where does my donation go?",
                answer:
                  "All donated clothing is distributed directly to communities in need through our network of local and international partners. Proceeds from our clothing line fund operational costs and expand our impact.",
              },
            ].map((faq, index) => (
              <AnimatedSection key={faq.question} delay={index * 100}>
                <div className="border-b border-border pb-8">
                  <h3 className="font-serif text-xl mb-3 text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
