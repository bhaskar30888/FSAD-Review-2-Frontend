import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Activity, Flame, Trophy, Calendar, Users, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getPrograms } from "../../services/programService";
import type { Program } from "../../types";

export function Fitness() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPrograms = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPrograms();
            setPrograms(data);
        } catch {
            setError("Failed to load programs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrograms();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Fitness Programs
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Tailored workouts to help you stay active and energized.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 rounded-2xl border border-orange-100 dark:border-orange-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-500">
                        <Flame className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Current Streak</p>
                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">12 Days</p>
                    </div>
                </div>
            </div>

            {/* Progress & Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            Weekly Activity Goal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="relative h-32 w-32 shrink-0">
                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                    <circle className="text-gray-200 dark:text-gray-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                    <circle className="text-blue-500 progress-ring stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" transform="rotate(-90 50 50)"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">75%</span>
                                    <span className="text-xs text-gray-500">Completed</span>
                                </div>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Cardio Minutes</span>
                                        <span className="text-gray-500">120 / 150</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Strength Sessions</span>
                                        <span className="text-gray-500">2 / 3</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '66%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-100 dark:border-yellow-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500">
                            <Trophy className="h-5 w-5" />
                            Recent Badge
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-8 pt-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 shadow-xl shadow-yellow-500/20 dark:bg-yellow-500/20 ring-4 ring-yellow-50 dark:ring-yellow-900/30 mb-4"
                        >
                            <span className="text-4xl text-yellow-600 dark:text-yellow-500">🏃</span>
                        </motion.div>
                        <h3 className="font-bold text-yellow-900 dark:text-yellow-400">Weekend Warrior</h3>
                        <p className="text-sm text-yellow-700/80 dark:text-yellow-500/80 mt-1">Worked out 3 weekends in a row</p>
                    </CardContent>
                </Card>
            </div>

            {/* Programs Fetched From API */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Available Programs
                    </h2>
                </div>

                {loading && (
                    <div className="flex justify-center p-8">
                        <RefreshCw className="h-8 w-8 text-primary-500 animate-spin" />
                    </div>
                )}

                {error && !loading && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={loadPrograms}>Retry</Button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {programs.length > 0 ? programs.map((program) => (
                            <Card key={program.id} className="group overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-surface-dark flex flex-col">
                                <div className="h-32 bg-primary-100 dark:bg-primary-900/20 relative flex items-center justify-center">
                                    <Activity className="h-10 w-10 text-primary-500 opacity-50" />
                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium capitalize shadow">
                                            Fitness
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1" title={program.title}>{program.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2" title={program.description}>{program.description}</p>
                                    </div>
                                    <div className="space-y-2 mt-auto text-xs text-gray-500">
                                        {program.schedule && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{program.schedule}</span>
                                            </div>
                                        )}
                                        {program.instructor && (
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3.5 w-3.5" />
                                                <span>{program.instructor}</span>
                                            </div>
                                        )}
                                    </div>
                                    <Button variant="outline" className="w-full mt-2" onClick={() => alert("Registration feature coming soon!")}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        )) : (
                            <div className="col-span-full text-center py-8 text-gray-500 bg-white dark:bg-surface-dark border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                No programs available at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
