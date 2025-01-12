import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { AuthLayout } from "./layouts/auth-layout";
import { TodayPage } from "./pages/today-page";
import { AppLayout } from "./layouts/app-layout/app-layout";
import ProtectedRoute from "@/modules/auth/components/protected-route";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import { SignUpForm } from "@/modules/auth/components/sign-up-form";
import { ErrorPage } from "./pages/error-page";
import { InboxPage } from "./pages/inbox-page";
import { ProjectPage } from "./pages/project-page";

export function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/auth"
        element={
          <ProtectedRoute redirectPath="/app/today" authRequired={false}>
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="login" replace />} />
        <Route path="/auth/login" element={<SignInForm />} />
        <Route path="/auth/signup" element={<SignUpForm />} />
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
        <Route index element={<Navigate to="today" replace />} />
        <Route path="/app/inbox" element={<InboxPage />} />
        <Route path="/app/today" element={<TodayPage />} />
        <Route path="/app/projects/:id" element={<ProjectPage />} />
        <Route path="/app/*" element={<Navigate to="today" replace />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
