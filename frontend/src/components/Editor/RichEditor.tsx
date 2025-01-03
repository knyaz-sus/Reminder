import { useEditor, EditorContent, FocusPosition } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenuEditor } from "./BubbleMenuEditor";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";

interface RichEditorProps {
  content?: string;
  handleSave: (arg: string) => void;
  placeholder: string;
  autofocus?: FocusPosition;
}

export function RichEditor({
  handleSave,
  content,
  placeholder,
  autofocus,
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder }), Underline],
    content,
    onUpdate(editor) {
      handleSave(editor.editor.getHTML());
    },
    autofocus,
  });
  return (
    !!editor && (
      <div>
        <EditorContent editor={editor} className="text-sm" />
        <BubbleMenuEditor editor={editor} />
      </div>
    )
  );
}
