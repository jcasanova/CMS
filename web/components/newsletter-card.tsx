import { cn } from "@/lib/cn";

type NewsletterCardProps = {
  title?: string;
  className?: string;
};

export function NewsletterCard({
  title = "Get insights and product updates straight to your inbox.",
  className,
}: NewsletterCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl bg-brand-600/90 p-6 text-white shadow-xl shadow-brand-900/20 ring-1 ring-white/10 backdrop-blur-sm",
        className,
      )}
    >
      <p className="text-sm font-medium leading-snug">{title}</p>
      <form
        action="/api/subscribe"
        method="post"
        className="mt-4 flex flex-col gap-2.5"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="email@example.com"
          className="h-11 rounded-lg bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none ring-1 ring-transparent focus:ring-accent-400"
        />
        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent-500 text-sm font-medium text-white transition-colors hover:bg-accent-600"
        >
          <MailIcon className="size-4" />
          Subscribe
        </button>
      </form>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
