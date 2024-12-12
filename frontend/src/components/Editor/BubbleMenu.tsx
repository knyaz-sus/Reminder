import { useEffect, useRef } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import { Portal } from "@/components/Portal";
import { Toggle } from "../Toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { isMarkActive, toggleMark } from "./helpers";

export function BubbleMenu() {
  const editor = useSlate();
  const inFocus = useFocused();
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const menu = menuRef.current;
    const { selection } = editor;
    if (!menu) return;
    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      menu.removeAttribute("style");
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    menu.style.opacity = "1";
    menu.style.top = `${rect.top + window.screenY - menu.offsetHeight}px`;
    menu.style.left = `${
      rect.left + window.screenX - menu.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Portal>
      <div
        className="absolute top-[-10000px] left-[-10000px] opacity-0 transition-opacity gap-2"
        ref={menuRef}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Toggle
          size="sm"
          pressed={isMarkActive(editor, "bold")}
          onPressedChange={() => toggleMark(editor, "bold")}
          aria-label="Format Bold"
        >
          <Bold />
        </Toggle>
        <Toggle
          size="sm"
          pressed={isMarkActive(editor, "italic")}
          onPressedChange={() => toggleMark(editor, "italic")}
          aria-label="Format Italic"
        >
          <Italic />
        </Toggle>
        <Toggle
          size="sm"
          pressed={isMarkActive(editor, "underline")}
          onPressedChange={() => toggleMark(editor, "underline")}
          aria-label="Format Underline"
        >
          <Underline />
        </Toggle>
      </div>
    </Portal>
  );
}
