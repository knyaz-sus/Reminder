import { Button } from "@/components/button";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1>home</h1>
      <Button asChild>
        <Link to="/auth"> Auth</Link>
      </Button>
      <Button asChild>
        <Link to="/app">App</Link>
      </Button>
    </div>
  );
}
