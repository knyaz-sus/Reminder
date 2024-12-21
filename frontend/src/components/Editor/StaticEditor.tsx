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
  if (!editor || editor.isEmpty) return null;
  return <EditorContent editor={editor} className="text-sm" />;
}
