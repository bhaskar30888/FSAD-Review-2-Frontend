import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";

export function AdminLayout() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar role="admin" />
            <main className="flex-1 p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}
