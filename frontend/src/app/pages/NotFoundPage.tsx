import { Link } from "react-router-dom";
import { Button } from "@/components/Button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
      <h1>Not such route 404</h1>
      <Button>
        <Link to={"/"}>Go to home page</Link>
      </Button>
    </div>
  );
}
