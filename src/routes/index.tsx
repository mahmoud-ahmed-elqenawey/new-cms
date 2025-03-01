import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import useAuth from "@/store/useAuth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}

        {!isAuthenticated && <Route path="login" element={<LoginPage />} />}

        {isAuthenticated && (
          <Route path="login" element={<Navigate to="/" replace />} />
        )}

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
