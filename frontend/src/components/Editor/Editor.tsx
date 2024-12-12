import { KeyboardEvent, useCallback, useState } from "react";
import { withHistory } from "slate-history";
import { Descendant, createEditor } from "slate";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";
import { Leaf } from "./Leaf";
import { BubbleMenu } from "./BubbleMenu";
import { toggleMark } from "./helpers";
import { EditableProps } from "slate-react/dist/components/editable";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export function Editor({ placeholder }: EditableProps) {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  const onKeyHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!e.ctrlKey) return;
    switch (e.key) {
      case "b":
        toggleMark(editor, "bold");
        break;
      case "i":
        e.preventDefault();
        toggleMark(editor, "italic");
        break;
      case "u": {
        e.preventDefault();
        toggleMark(editor, "underline");
        break;
      }
    }
  };
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <BubbleMenu />
      <Editable
        className="focus:outline-none text-sm"
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        renderPlaceholder={({ children, attributes }) => (
          <span className="no-underline not-italic font-normal" {...attributes}>
            {children}
          </span>
        )}
        onKeyDown={onKeyHandler}
      />
    </Slate>
  );
}
