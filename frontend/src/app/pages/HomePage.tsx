import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
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
