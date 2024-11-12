import { Link } from "react-router-dom";

interface FormFooterProps {
  path: string;
  link: string;
  content: string;
}

export function FormFooter({ path, link, content }: FormFooterProps) {
  return (
    <div className="text-sm text-center">
      {content}
      <Link className="underline" to={path}>
        {link}
      </Link>
    </div>
  );
}
