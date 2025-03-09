import Layout from "@/layout/Layout";
import CenterGroupsPage from "@/pages/CenterGroupsPage";
import ClassDetailsPage from "@/pages/ClassDetailsPage";
import CourseDetailsPage from "@/pages/CourseDetailsPage";
import CoursesPage from "@/pages/CoursesPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Home from "@/pages/Home";
import InventoryItemPage from "@/pages/InventoryItemPage";
import InventoryPage from "@/pages/InventoryPage";
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
// import Profile from "@/pages/Profile";
// import Settings from "@/pages/Settings";
import StatisticsPage from "@/pages/StatisticsPage";
import StudentDetailsPage from "@/pages/StudentDetailsPage";
import StudentsPage from "@/pages/StudentsPage";
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
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:id" element={<CourseDetailsPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="students/:id" element={<StudentDetailsPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/:id" element={<InventoryItemPage />} />
            <Route path="center-groups" element={<CenterGroupsPage />} />
            <Route
              path="center-groups/class/:classId"
              element={<ClassDetailsPage />}
            />
          </Route>
        )}

        {!isAuthenticated && (
          <>
            <Route path="login" element={<LoginPage />} />
            <Route path="otp" element={<OtpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </>
        )}

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
