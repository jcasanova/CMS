import Link from "next/link";

const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Product",
    links: [
      { label: "Hue Design System", href: "/docs/welcome/overview" },
      { label: "Components", href: "/docs/components/overview" },
      { label: "Updates", href: "/docs/updates/latest" },
    ],
  },
  {
    title: "Team",
    links: [
      { label: "Meet the team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "Talk to us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Getting started", href: "/docs/welcome/getting-started" },
      { label: "Theming", href: "/docs/theming/regular-theming" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-paper-border bg-paper-muted/40">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-brand-500 text-white">•</span>
              <span className="font-display text-lg text-ink-900">Enterprise AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink-500">
              Simplify, automate, and unify operations — enabling seamless, high-quality health
              experiences through intelligent, connected systems.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-700 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper-border pt-6 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Enterprise AI. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink-900">Privacy</Link>
            <Link href="/terms" className="hover:text-ink-900">Terms</Link>
            <Link href="/security" className="hover:text-ink-900">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
