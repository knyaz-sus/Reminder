import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";

interface EditorProps {
  content?: string;
}

export function StaticEditor({ content }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: false,
    content,
  });

  return <EditorContent editor={editor} className="flex-auto text-sm" />;
}
