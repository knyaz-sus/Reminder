import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { TodayPage } from "./pages/TodayPage";
import { AppLayout } from "./layouts/AppLayout/AppLayout";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { NotFoundPage } from "./pages/NotFoundPage";
import { InboxPage } from "./pages/InboxPage";
import { UpcomingPage } from "./pages/UpcomingPage";
import { DonePage } from "./pages/DonePage";
import { ProjectPage } from "./pages/ProjectPage";

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
        <Route path="/app/done" element={<DonePage />} />
        <Route path="/app/inbox" element={<InboxPage />} />
        <Route path="/app/upcoming" element={<UpcomingPage />} />
        <Route path="/app/today" element={<TodayPage />} />
        <Route path="/app/projects/:id" element={<ProjectPage />} />
        <Route path="/app/*" element={<Navigate to="today" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
