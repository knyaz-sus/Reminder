import { RenderLeafProps } from "slate-react";

export function Leaf({ attributes, leaf, children }: RenderLeafProps) {
  if (leaf.bold) children = <strong {...attributes}>{children}</strong>;
  if (leaf.italic) children = <i {...attributes}>{children}</i>;
  if (leaf.underline) children = <u {...attributes}>{children}</u>;
  return <span {...attributes}>{children}</span>;
}
