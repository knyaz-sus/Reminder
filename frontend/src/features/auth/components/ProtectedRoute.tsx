import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath: string;
  authRequired: boolean;
}

export default function ProtectedRoute({
  children,
  redirectPath,
  authRequired,
}: ProtectedRouteProps) {
  const { session, isAuthLoading } = useAuth();

  if (isAuthLoading) return;

  if ((authRequired && !session?.user) || (!authRequired && session?.user))
    return <Navigate to={redirectPath} replace />;

  return children;
}
