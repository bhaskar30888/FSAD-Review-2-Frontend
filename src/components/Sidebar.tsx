import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import {
    LayoutDashboard,
    Heart,
    Activity,
    Apple,
    Phone,
    Settings,
    Users,
    BarChart3,
    BookOpen,
} from "lucide-react";

interface SidebarProps {
    role: "student" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
    const location = useLocation();

    const studentLinks = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Programs", href: "/programs", icon: Activity },
        { name: "Resources", href: "/resources", icon: Heart },
        { name: "Journal", href: "/journal", icon: BookOpen },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Profile", href: "/profile", icon: Users },
        { name: "Support", href: "/support", icon: Phone },
    ];

    const adminLinks = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Resources", href: "/admin/resources", icon: Heart },
        { name: "Programs", href: "/admin/programs", icon: Activity },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Reports", href: "/admin/reports", icon: Apple },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const links = role === "student" ? studentLinks : adminLinks;

    return (
        <aside className="hidden w-64 flex-col border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-surface-dark md:flex">
            <nav className="flex flex-1 flex-col gap-1 p-4">
                {links.map((link) => {
                    const isActive = location.pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-50"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
