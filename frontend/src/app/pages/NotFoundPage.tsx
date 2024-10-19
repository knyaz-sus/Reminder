import { Link } from "react-router-dom";
import { TextButton } from "../../components/TextButton";

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
      <h1>Not such route 404</h1>
      <TextButton>
        <Link to={"/"}>Go to home page</Link>
      </TextButton>
    </div>
  );
}
