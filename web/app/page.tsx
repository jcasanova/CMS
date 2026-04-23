import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterCard } from "@/components/newsletter-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <SiteNav variant="overlay" />

      <main className="flex flex-1 flex-col">
        <section
          className="relative isolate flex min-h-[820px] flex-col justify-end overflow-hidden text-white"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.brand.400/0.6),transparent_60%),linear-gradient(135deg,theme(colors.brand.900),theme(colors.brand.700)_35%,theme(colors.brand.500)_75%,theme(colors.brand.400))]" />
          <div
            className="absolute inset-0 -z-10 opacity-[0.25] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 70% 20%, rgba(255,255,255,.35), transparent 60%), radial-gradient(800px 400px at 20% 80%, rgba(255,255,255,.2), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 2px, transparent 2px 22px), repeating-linear-gradient(65deg, rgba(0,0,0,.08) 0 2px, transparent 2px 28px)",
            }}
          />

          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-end gap-10 px-6 pb-24 pt-48 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Intelligent. Connected. Health.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                We simplify, automate, and unify operations — reducing cost and
                enabling seamless, high-quality health experiences. With personal
                productivity tools, AI agents, and AI concierge support, we deliver
                faster, smarter, more connected interactions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about" variant="light" size="lg">
                  Learn more about us
                </Button>
                <Button href="/products" variant="outline" size="lg">
                  View Products
                </Button>
              </div>
            </div>

            <div className="md:justify-self-end">
              <NewsletterCard />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              What we build
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink-900">
              A design system and product suite for AI-native health teams.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Hue is the design system behind Enterprise AI — a Figma kit,
              component library, and theming toolkit crafted for intelligent,
              connected experiences. Browse the documentation to get started.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/docs/welcome/overview" size="lg">
                Explore the Hue Design System
              </Button>
              <Button href="/docs" variant="ghost" size="lg">
                Browse docs
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
