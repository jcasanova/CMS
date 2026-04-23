import Link from "next/link";
import { cn } from "@/lib/cn";

type NavItem =
  | { label: string; href: string }
  | { label: string; href: string; children: Array<{ label: string; href: string }> };

const navItems: NavItem[] = [
  { label: "Meet the team", href: "/team" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Hue Design System", href: "/docs/welcome/overview" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

type SiteNavProps = { variant?: "overlay" | "solid" };

export function SiteNav({ variant = "overlay" }: SiteNavProps) {
  const isOverlay = variant === "overlay";
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-4 z-40 mx-auto flex w-[min(1200px,calc(100%-2rem))] items-center justify-between rounded-full px-4 py-2 backdrop-blur-md",
        isOverlay
          ? "bg-black/30 text-white ring-1 ring-white/10"
          : "bg-paper/80 text-ink-900 ring-1 ring-paper-border"
      )}
    >
      <Link href="/" className="flex items-center gap-2 pl-2 pr-4 py-2">
        <Sparkle className="size-5" />
        <span className="text-sm font-medium tracking-tight">Enterprise AI</span>
      </Link>

      <ul className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isOverlay
                  ? "hover:bg-white/10"
                  : "hover:bg-paper-muted"
              )}
            >
              {item.label}
              {"children" in item && <Chevron className="size-3.5 opacity-70" />}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={cn(
          "hidden rounded-full px-5 py-2 text-sm font-medium transition-colors md:inline-flex",
          isOverlay ? "hover:bg-white/10" : "hover:bg-paper-muted"
        )}
      >
        Talk to Us
      </Link>
    </nav>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M5.6 5.6l2.8 2.8" />
      <path d="M15.6 15.6l2.8 2.8" />
      <path d="M5.6 18.4l2.8-2.8" />
      <path d="M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
