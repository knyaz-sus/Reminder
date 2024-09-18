import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { AppTodayPage } from "./pages/AppTodayPage";
import { AppLayout } from "./pages/AppLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/auth"
        element={
          <ProtectedRoute redirectPath="/app/today" authRequired={false}>
            <AuthPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app"
        element={
          <ProtectedRoute redirectPath="/auth" authRequired={true}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/app/today" element={<AppTodayPage />} />
      </Route>
    </Routes>
  );
}
