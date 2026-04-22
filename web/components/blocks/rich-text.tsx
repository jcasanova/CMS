import type { RichTextBlock } from "@/lib/strapi";

type Node = {
  type: string;
  children?: Node[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  url?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  language?: string;
  image?: { url: string; alternativeText?: string };
};

function renderText(node: Node, key: string): React.ReactNode {
  let content: React.ReactNode = node.text ?? "";
  if (node.code) content = <code className="rounded bg-paper-muted px-1 py-0.5 font-mono text-[0.9em] text-ink-900">{content}</code>;
  if (node.bold) content = <strong className="font-semibold text-ink-900">{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  return <span key={key}>{content}</span>;
}

function renderChildren(children: Node[] | undefined, prefix: string): React.ReactNode {
  return children?.map((child, i) => renderNode(child, `${prefix}-${i}`));
}

function renderNode(node: Node, key: string): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className="leading-relaxed text-ink-700">
          {renderChildren(node.children, key)}
        </p>
      );
    case "heading": {
      const level = node.level ?? 2;
      const sizes = {
        1: "text-4xl md:text-5xl",
        2: "text-3xl md:text-4xl",
        3: "text-2xl md:text-3xl",
        4: "text-xl md:text-2xl",
        5: "text-lg md:text-xl",
        6: "text-base md:text-lg",
      }[level];
      const Tag = (`h${level}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={key} className={`font-display font-semibold tracking-tight text-ink-900 ${sizes}`}>
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const cls = node.format === "ordered" ? "list-decimal" : "list-disc";
      return (
        <ListTag key={key} className={`${cls} space-y-1.5 pl-6 text-ink-700`}>
          {renderChildren(node.children, key)}
        </ListTag>
      );
    }
    case "list-item":
      return <li key={key}>{renderChildren(node.children, key)}</li>;
    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-brand-400 bg-brand-50/40 py-2 pl-5 pr-4 italic text-ink-700"
        >
          {renderChildren(node.children, key)}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={key}
          className="overflow-x-auto rounded-xl bg-ink-900 px-5 py-4 font-mono text-sm text-paper"
        >
          <code>{node.children?.map((c) => c.text).join("")}</code>
        </pre>
      );
    case "link":
      return (
        <a
          key={key}
          href={node.url}
          className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
        >
          {renderChildren(node.children, key)}
        </a>
      );
    case "image":
      return node.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={key}
          src={node.image.url}
          alt={node.image.alternativeText ?? ""}
          className="rounded-lg"
        />
      ) : null;
    case "text":
      return renderText(node, key);
    default:
      return renderChildren(node.children, key);
  }
}

export function RichTextBlockView({ block }: { block: RichTextBlock }) {
  const nodes = Array.isArray(block.body) ? (block.body as Node[]) : [];
  return (
    <div className="space-y-4 text-base leading-relaxed">
      {nodes.map((n, i) => renderNode(n, `rt-${i}`))}
    </div>
  );
}
