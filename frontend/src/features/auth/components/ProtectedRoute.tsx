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
  const { authUser, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return;
  }

  if (authRequired && !authUser) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!authRequired && authUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
