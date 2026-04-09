import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { motion } from "framer-motion";
import { Award, Target, Settings, User, Bell, RefreshCw, AlertCircle } from "lucide-react";
import { getUser, updateUser } from "../../services/userService";
import { getGoals } from "../../services/goalService";
import type { User as UserType, Goal } from "../../types";

export function Profile() {
    const [activeTab, setActiveTab] = useState<"settings" | "goals" | "badges">("goals");
    
    const [profileData, setProfileData] = useState<UserType | null>(null);
    const [goals, setGoals] = useState<Goal[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [nameInput, setNameInput] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Note: Since we need userId from token if not in storage, but we put it in context 
            // In AuthContext user object just has {name, role, email}. We need userId from localStorage.
            const saved = localStorage.getItem('campuscare-auth');
            let userId = 1; // Fallback
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.userId) userId = parsed.userId;
                } catch {
                    console.error("Failed to parse campuscare-auth from localStorage.");
                }
            }
            
            const [fetchedUser, fetchedGoals] = await Promise.all([
                getUser(userId),
                getGoals()
            ]);
            
            setProfileData(fetchedUser);
            setGoals(fetchedGoals);
            setNameInput(fetchedUser.name);
            
        } catch {
            setError("Failed to load profile data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async () => {
        if (!profileData) return;
        setIsSaving(true);
        try {
            await updateUser(profileData.id, { name: nameInput });
            setProfileData({ ...profileData, name: nameInput });
            alert("Settings saved successfully!");
        } catch {
            alert("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
                <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Student Profile
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your wellness goals, achievements, and account settings.
                    </p>
                </div>
            </div>

            {/* Profile Header */}
            <Card className="overflow-hidden bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="h-24 bg-primary-600 dark:bg-primary-900/50"></div>
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-10">
                        <div className="h-24 w-24 rounded-full border-4 border-white dark:border-surface-dark bg-primary-100 dark:bg-primary-900/80 flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-400">
                            {profileData?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profileData?.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{profileData?.email}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => setActiveTab("goals")}
                    className={`pb-4 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "goals" ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                >
                    <div className="flex items-center gap-2"><Target className="h-4 w-4" /> Goals</div>
                </button>
                <button
                    onClick={() => setActiveTab("badges")}
                    className={`pb-4 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "badges" ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                >
                    <div className="flex items-center gap-2"><Award className="h-4 w-4" /> Achievements</div>
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`pb-4 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "settings" ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                >
                    <div className="flex items-center gap-2"><Settings className="h-4 w-4" /> Settings</div>
                </button>
            </div>

            {/* Content areas */}
            {activeTab === "goals" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <Card className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Active Wellness Goals</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {goals.length > 0 ? goals.map(goal => (
                                <div key={goal.id} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium dark:text-white">{goal.title}</span>
                                        <span className={`text-${goal.color}-600 dark:text-${goal.color}-400 font-medium`}>
                                            {goal.current}/{goal.target} {goal.unit}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${goal.color}-500 rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center py-4">No active goals.</p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {activeTab === "badges" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30 text-center shadow-sm">
                        <CardContent className="pt-6 flex flex-col items-center">
                            <div className="h-16 w-16 bg-amber-500 rounded-full flex items-center justify-center text-white shadow font-bold mb-4">
                                <Award className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Early Bird</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Logged in before 7 AM 5 days in a row.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30 text-center shadow-sm">
                        <CardContent className="pt-6 flex flex-col items-center">
                            <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow font-bold mb-4">
                                <Target className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Goal Crusher</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Completed all weekly fitness goals.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-800/10 border-gray-200 dark:border-gray-800 text-center grayscale opacity-60 shadow-sm">
                        <CardContent className="pt-6 flex flex-col items-center">
                            <div className="h-16 w-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center text-white mb-4">
                                <Award className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Zen Master</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Complete 30 days of meditation.</p>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {activeTab === "settings" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <Card className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary-500" />
                                <CardTitle>Personal Information</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <Input value={nameInput} onChange={e => setNameInput(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                    <Input value={profileData?.email} disabled className="bg-gray-50 dark:bg-gray-800 text-gray-500" />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-indigo-500" />
                                <CardTitle>Notification Preferences</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Daily Wellness Reminders</p>
                                    <p className="text-sm text-gray-500">Get notified to log your mood and hydration.</p>
                                </div>
                                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Upcoming Session Alerts</p>
                                    <p className="text-sm text-gray-500">Reminders for scheduled counseling sessions.</p>
                                </div>
                                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
