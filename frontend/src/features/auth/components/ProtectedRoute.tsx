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
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  if (authRequired && !user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!authRequired && user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
