import { priorities } from "@/constants/ui";
import { Circle } from "lucide-react";

export function TaskCheck({
  priority,
}: {
  priority: (typeof priorities)[number];
}) {
  const getCheckColor = () => {
    switch (priority) {
      case "1":
        return "#dc2828";
      case "2":
        return "#facc14";
      case "3":
        return "#2463eb";
      case "4":
        return "#ffff";
    }
  };

  return (
    <button>
      <Circle size={18} color={getCheckColor()} />
    </button>
  );
}
