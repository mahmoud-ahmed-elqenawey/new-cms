import Layout from "@/layout/Layout";
import CourseDetailsPage from "@/pages/CourseDetailsPage";
import CoursesPage from "@/pages/CoursesPage";
import Home from "@/pages/Home";
import InventoryItemPage from "@/pages/InventoryItemPage";
import InventoryPage from "@/pages/InventoryPage";
import LoginPage from "@/pages/LoginPage";
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
