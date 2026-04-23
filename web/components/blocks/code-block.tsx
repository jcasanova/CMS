import type { CodeBlockBlock } from "@/lib/strapi";

export function CodeBlockView({ block }: { block: CodeBlockBlock }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-paper-border bg-ink-900 text-paper shadow-sm">
      {(block.filename || block.language) && (
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-paper/70">
          <span className="truncate font-mono">{block.filename ?? ""}</span>
          <span className="uppercase tracking-wider">{block.language}</span>
        </header>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
        <code>{block.code}</code>
      </pre>
      {block.caption && (
        <figcaption className="border-t border-white/10 px-4 py-2 text-xs text-paper/60">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
