import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
    Heart,
    Flame,
    Calendar,
    TrendingUp,
    BrainCircuit,
    Dumbbell,
    Target
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const activityData = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 85 },
    { day: "Thu", score: 78 },
    { day: "Fri", score: 90 },
    { day: "Sat", score: 95 },
    { day: "Sun", score: 88 },
];

export default function DashboardOverview() {
    const { user } = useAuth();
    const firstName = user?.name.split(" ")[0] || "Student";

    const stats = [
        { label: "Wellness Score", value: "88/100", icon: Heart, trend: "+5% this week", color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-500/10" },
        { label: "Current Streak", value: "12 Days", icon: Flame, trend: "Personal best!", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-500/10" },
        { label: "Active Goals", value: "4", icon: Target, trend: "2 completed", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome back, {firstName} 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Here's what is happening with your wellness journey today.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl">
                    <Calendar className="w-4 h-4" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 md:grid-cols-3"
            >
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-500 font-medium">{stat.trend}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3">
                {/* Chart */}
                <Card className="md:col-span-4 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Weekly Activity Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#14b8a6', fontWeight: 600 }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Motivational Quote & Quick Actions */}
                <div className="md:col-span-3 lg:col-span-1 space-y-6">
                    <Card className="bg-primary-600 dark:bg-primary-900/50 border-0 text-white shadow-lg shadow-primary-500/10">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute -right-6 -top-6 text-white/5">
                                <span className="text-9xl font-serif">"</span>
                            </div>
                            <div className="relative z-10">
                                <p className="text-lg font-medium leading-relaxed mb-4">
                                    "Happiness is not by chance, but by choice. Take a moment for yourself today."
                                </p>
                                <p className="text-sm text-primary-100 font-medium">— Jim Rohn</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => alert("Starting a new meditation session...")}>
                                <BrainCircuit className="h-5 w-5 text-indigo-500" />
                                Start a Meditation
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => alert("Opening workout logger...")}>
                                <Dumbbell className="h-5 w-5 text-rose-500" />
                                Log a Workout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
