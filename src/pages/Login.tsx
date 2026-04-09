import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { HeartPulse, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            // After successful login, auth context should contain user.
            // Navigate based on selected email for now since we can't await context update seamlessly without use effect,
            // but login() throws if it fails.
            // The role is normally returned and saved, we can wait until login finishes.
            const saved = localStorage.getItem('campuscare-auth');
            let role = 'student';
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.role) role = parsed.role;
                } catch {
                    console.error("Failed to parse campuscare-auth from localStorage.");
                }
            }
            navigate(role === "admin" ? "/admin" : "/dashboard");
        } catch {
            setError("Invalid credentials. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50/50 dark:bg-surface-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 blur-3xl pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-0 shadow-2xl shadow-primary-500/10 dark:shadow-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                            <HeartPulse className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Sign in to your CampusCare account
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="text-center mb-6">
                            <div className="inline-flex flex-col gap-1 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-sm text-primary-800 dark:text-primary-300 w-full text-left">
                                <span className="font-semibold">Demo Credentials:</span>
                                <span>Student: student@gmail.com</span>
                                <span>Admin: admin@gmail.com</span>
                                <span>Password: 123456</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    University Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        required
                                        type="email"
                                        placeholder="student@uni.edu"
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-9"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-6" disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                                Register here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
