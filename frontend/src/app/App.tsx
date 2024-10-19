import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppTodayPage } from "./pages/AppTodayPage";
import { AppLayout } from "./layouts/AppLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { SignInForm } from "../features/auth/components/SignInForm";
import { SignUpForm } from "../features/auth/components/SignUpForm";
import { NotFoundPage } from "./pages/NotFoundPage";
import { InboxPage } from "./pages/InboxPage";
import { UpcomingPage } from "./pages/UpcomingPage";
import { DonePage } from "./pages/DonePage";

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
        <Route path="/app/today" element={<AppTodayPage />} />
        <Route path="/app/*" element={<Navigate to="today" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
