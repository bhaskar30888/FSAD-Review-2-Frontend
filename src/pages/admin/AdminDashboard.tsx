import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
    Users,
    Download,
    Activity,
    CheckCircle2,
    TrendingUp,
    XCircle,
    FileText,
    Loader2
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";
import { motion } from "framer-motion";
import { getAnalytics } from "../../services/adminService";
import type { AdminAnalyticsSummary } from "../../types";

const userGrowthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 1200 },
    { month: "Mar", users: 2400 },
    { month: "Apr", users: 3800 },
    { month: "May", users: 5100 },
    { month: "Jun", users: 6800 },
];

const resourceUsageData = [
    { name: "Counseling", value: 450 },
    { name: "Fitness Plans", value: 850 },
    { name: "Meditation", value: 1200 },
    { name: "Diet Tools", value: 650 },
];

const wellnessTrendData = [
    { week: "W1", avgScore: 68 },
    { week: "W2", avgScore: 71 },
    { week: "W3", avgScore: 74 },
    { week: "W4", avgScore: 79 },
    { week: "W5", avgScore: 82 },
];

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState<AdminAnalyticsSummary | null>(null);

    useEffect(() => {
        getAnalytics().then(setAnalytics).catch(console.error);
    }, []);

    const exportCsv = () => {
        alert("Exporting User Analytics Data as CSV...");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Platform analytics, user engagement, and resource management.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 shrink-0">
                        <FileText className="h-4 w-4" /> Reports
                    </Button>
                    <Button onClick={exportCsv} className="gap-2 shrink-0">
                        <Download className="h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* KPI Stats */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                {[
                    { title: "Total Users", val: analytics ? analytics.totalUsers.toLocaleString() : "-", plus: "+14%", icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/40" },
                    { title: "Active Users", val: analytics ? analytics.activeUsers.toLocaleString() : "-", plus: "+5%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
                    { title: "Total Resources", val: analytics ? analytics.totalResources.toLocaleString() : "-", plus: "+12", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/40" },
                    { title: "Total Programs", val: analytics ? analytics.totalPrograms.toLocaleString() : "-", plus: "", icon: CheckCircle2, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/40" },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        {analytics ? (
                                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.val}</p>
                                        ) : (
                                            <div className="flex items-center h-9"><Loader2 className="h-5 w-5 animate-spin text-gray-400" /></div>
                                        )}
                                        {stat.plus && analytics && <span className="text-sm font-medium text-emerald-500">{stat.plus}</span>}
                                    </div>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* User Growth */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth (Last 6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-colors-white)' }}
                                        itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                                    />
                                    <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Resource Usage */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resource Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={resourceUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} width={90} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#10b981', fontWeight: 600 }}
                                    />
                                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Quality/Wellness Trend */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Student Wellness Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={wellnessTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#8b5cf6', fontWeight: 600 }}
                                    />
                                    <Line type="monotone" dataKey="avgScore" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Approvals (Counseling) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Counseling Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { id: "REQ-921", student: "Emily R.", type: "In-person", urgent: true },
                            { id: "REQ-922", student: "Michael T.", type: "Virtual", urgent: false },
                            { id: "REQ-923", student: "Sarah M.", type: "In-person", urgent: false },
                        ].map(req => (
                            <div key={req.id} className="flex flex-col gap-2 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{req.student}</h4>
                                        <p className="text-xs text-gray-500">{req.type} | {req.id}</p>
                                    </div>
                                    {req.urgent && <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Urgent</span>}
                                </div>
                                <div className="flex gap-2 mt-1">
                                    <Button size="sm" className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                                    <Button size="sm" variant="outline" className="h-8 px-2"><XCircle className="w-4 h-4 text-gray-500" /></Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full text-sm">View All Requests</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
