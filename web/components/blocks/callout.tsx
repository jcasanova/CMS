import type { CalloutBlock } from "@/lib/strapi";
import { RichTextBlockView } from "./rich-text";
import { cn } from "@/lib/cn";

const styles: Record<CalloutBlock["variant"], string> = {
  info:    "bg-brand-50 border-brand-200 text-brand-900",
  tip:     "bg-accent-400/10 border-accent-400/40 text-accent-600",
  success: "bg-brand-100 border-brand-300 text-brand-900",
  warning: "bg-amber-50 border-amber-300 text-amber-900",
  danger:  "bg-red-50 border-red-300 text-red-900",
};

const icons: Record<CalloutBlock["variant"], string> = {
  info: "i",
  tip: "✦",
  success: "✓",
  warning: "!",
  danger: "!",
};

export function CalloutBlockView({ block }: { block: CalloutBlock }) {
  return (
    <aside className={cn("rounded-xl border px-5 py-4", styles[block.variant])}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-current/10 font-semibold">
          {icons[block.variant]}
        </span>
        <div className="min-w-0 flex-1">
          {block.title && (
            <p className="mb-1 font-semibold">{block.title}</p>
          )}
          <div className="prose-callout [&_p]:m-0">
            <RichTextBlockView block={{ __component: "shared.rich-text", id: block.id, body: block.body }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
