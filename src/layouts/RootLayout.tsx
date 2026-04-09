import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ChatBot } from "../components/ChatBot";
import { Toast } from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";

export function RootLayout() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Show welcome toast only when logged in and navigating to dashboard 
    const showToast = isAuthenticated && location.pathname.includes('/dashboard');

    return (
        <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <ChatBot />
            {showToast && <Toast message="Welcome back to CampusCare!" />}
        </div>
    );
}
