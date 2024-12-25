import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { useEffect } from "react";

interface EditorProps {
  content?: string;
}

export function StaticEditor({ content }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: false,
    content,
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      console.log("Данные обновились в эдиторах статичных", content);
      editor.commands.setContent(content || "");
    }
    console.log("Стейт едитора", editor?.getHTML());
  }, [content, editor]);

  return (
    <div>
      <EditorContent editor={editor} className="flex-auto text-sm" />
    </div>
  );
}
