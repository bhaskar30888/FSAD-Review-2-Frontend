import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";

export function DashboardLayout() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== "student") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar role="student" />
            <main className="flex-1 p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}
