import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import { RootLayout } from "./layouts/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import { MentalHealth } from "./pages/dashboard/MentalHealth";
import { Fitness } from "./pages/dashboard/Fitness";
import { Nutrition } from "./pages/dashboard/Nutrition";
import { Emergency } from "./pages/dashboard/Emergency";
import { Profile } from "./pages/dashboard/Profile";
import { Journal } from "./pages/dashboard/Journal";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminResources from "./pages/admin/AdminResources";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Stubs for remaining pages
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-surface-dark p-4">
    <div className="text-center space-y-6 max-w-md">
      <div className="relative">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-surface-dark/80 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">Page Not Found</span>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">The page you are looking for doesn't exist or has been moved. Let's get you back on track.</p>
      <a href="/" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-primary-700 transition duration-300">
        Return Home
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="campuscare-theme">
      <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="dashboard" element={<DashboardOverview />} />
                  <Route path="programs" element={<Fitness />} />
                  <Route path="resources" element={<MentalHealth />} />
                  <Route path="journal" element={<Journal />} />
                  <Route path="analytics" element={<Nutrition />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="support" element={<Emergency />} />

                  {/* Legacy paths redirecting to top level equivalents */}
                  <Route path="dashboard/mental-health" element={<Navigate to="/resources" replace />} />
                  <Route path="dashboard/fitness" element={<Navigate to="/programs" replace />} />
                  <Route path="dashboard/nutrition" element={<Navigate to="/analytics" replace />} />
                  <Route path="dashboard/emergency" element={<Navigate to="/support" replace />} />
                </Route>

                {/* Explicit fallback aliases for Student sidebar links */}
                <Route path="users" element={<Navigate to="/admin/users" replace />} />

                {/* Admin Routes */}
                <Route path="admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="resources" element={<AdminResources />} />
                  <Route path="programs" element={<AdminPrograms />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
