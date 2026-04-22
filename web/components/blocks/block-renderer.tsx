import type { Block } from "@/lib/strapi";
import { HeroBlockView } from "./hero";
import { SectionHeadingBlockView } from "./section-heading";
import { RichTextBlockView } from "./rich-text";
import { CalloutBlockView } from "./callout";
import { CodeBlockView } from "./code-block";
import { ImageBlockView } from "./image";
import { FeatureGridBlockView } from "./feature-grid";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.__component) {
    case "shared.hero":
      return <HeroBlockView block={block} />;
    case "shared.section-heading":
      return <SectionHeadingBlockView block={block} />;
    case "shared.rich-text":
      return <RichTextBlockView block={block} />;
    case "shared.callout":
      return <CalloutBlockView block={block} />;
    case "shared.code-block":
      return <CodeBlockView block={block} />;
    case "shared.image":
      return <ImageBlockView block={block} />;
    case "shared.feature-grid":
      return <FeatureGridBlockView block={block} />;
    default:
      return null;
  }
}
