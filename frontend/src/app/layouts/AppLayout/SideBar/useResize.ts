import { RefObject, useEffect, useRef } from "react";

export const useResize = (
  sideBar: RefObject<HTMLElement>,
  separator: RefObject<HTMLDivElement>
) => {
  const isResizing = useRef(false);
  useEffect(() => {
    const handlePointerDown = () => {
      isResizing.current = true;
      document.body.style.pointerEvents = "none";
    };
    const handlePointerUp = () => {
      if (!isResizing) return;
      isResizing.current = false;
      document.body.style.pointerEvents = "all";
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!sideBar.current || !separator.current || !isResizing.current) return;
      let newWidth = `${e.clientX}px`;
      if (e.clientX <= 150) {
        newWidth = "150px";
      } else if (e.clientX >= 300) {
        newWidth = "300px";
      }
      sideBar.current.style.width = newWidth;
      localStorage.setItem("sideBarWidth", newWidth);
    };

    const currentSeparator = separator.current;

    currentSeparator?.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointermove", handlePointerMove);
    return () => {
      currentSeparator?.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [separator, sideBar]);
};
