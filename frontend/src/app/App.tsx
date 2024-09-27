import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthLayout } from "./pages/AuthLayout";
import { AppTodayPage } from "./pages/AppTodayPage";
import { AppLayout } from "./pages/AppLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { SignInForm } from "../features/auth/components/SignInForm";
import { SignUpForm } from "../features/auth/components/SingUpForm";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/auth"
        element={
          <ProtectedRoute redirectPath="/app/today" authRequired={false}>
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/auth/login" element={<SignInForm />} />
        <Route path="/auth/signup" element={<SignUpForm />} />
        <Route index element={<Navigate to="login" replace />} />
        <Route path="/auth/*" element={<Navigate to="login" replace />} />
      </Route>
      <Route
        path="/app"
        element={
          <ProtectedRoute redirectPath="/auth/login" authRequired={true}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/app/today" element={<AppTodayPage />} />
        <Route index element={<Navigate to="today" replace />} />
        <Route path="/app/*" element={<Navigate to="today" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
