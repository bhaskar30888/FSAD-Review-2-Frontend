import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";
import { Sun, Moon, Bell, HeartPulse } from "lucide-react";

import { useState, useEffect } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();
    const [notifications, setNotifications] = useState<{ id: number, title: string, message: string, time: string, read: boolean }[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            setNotifications([
                { id: 1, title: 'Welcome', message: 'Welcome to CampusCare!', time: '10 mins ago', read: false }
            ]);
        }
    }, [isAuthenticated]);

    const markAllNotificationsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-surface-dark/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <HeartPulse className="h-6 w-6 text-primary-500" />
                    <span className="text-xl font-bold tracking-tight text-primary-900 dark:text-primary-100">
                        CampusCare
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Notifications Dropdown (Mock) */}
                    {isAuthenticated && (
                        <div className="relative group">
                            <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors relative">
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-surface-dark"></span>}
                            </button>

                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 transform origin-top border-t-2 border-t-primary-500">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {notifications.length > 0 ? notifications.map(notif => (
                                        <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer ${notif.read ? 'opacity-50' : ''}`}>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                                        </div>
                                    )) : (
                                        <div className="p-4 text-center text-sm text-gray-500">No notifications yet.</div>
                                    )}
                                </div>
                                {notifications.length > 0 && (
                                    <div className="p-3 text-center border-t border-gray-100 dark:border-gray-800">
                                        <button onClick={markAllNotificationsRead} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">Mark all as read</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme} // Using the helper function
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {user ? (
                        <>
                            {user.role === "admin" ? (
                                <Link to="/admin">
                                    <Button variant="ghost" size="sm">Admin</Button>
                                </Link>
                            ) : (
                                <Link to="/dashboard">
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>
                            )}
                            <Button variant="outline" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
