import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Apple, Scale, Utensils, Droplet, Plus, Info, RefreshCw, AlertCircle, Save } from "lucide-react";
import { motion } from "framer-motion";
import { getNutritionLogs, addNutritionLog } from "../../services/nutritionService";
import type { NutritionLog } from "../../types";

export function Nutrition() {
    const [hydration, setHydration] = useState(3); // glasses out of 8
    const [bmi, setBmi] = useState<number | null>(null);

    const [logs, setLogs] = useState<NutritionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    
    // Add form state
    const [newMeal, setNewMeal] = useState("");
    const [newCalories, setNewCalories] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getNutritionLogs();
            setLogs(data);
        } catch {
            setError("Failed to load nutrition logs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    const handleAddLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMeal || !newCalories) return;
        
        setIsSaving(true);
        try {
            const added = await addNutritionLog({
                date: new Date().toISOString().split('T')[0],
                mealType: 'Snack', // Defaulting to Snack
                notes: newMeal,
                calories: Number(newCalories)
            });
            setLogs([added, ...logs]);
            setNewMeal("");
            setNewCalories("");
            setShowAddForm(false);
        } catch {
            alert("Failed to save nutrition log.");
        } finally {
            setIsSaving(false);
        }
    };

    const calculateBmi = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const w = Number(fd.get("weight"));
        const h = Number(fd.get("height")) / 100; // to meters
        if (w && h) {
            setBmi(Number((w / (h * h)).toFixed(1)));
        }
    };

    const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Nutrition & Diet Options
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Track your intake, log meals, and calculate your BMI.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Calorie Progress */}
                <Card className="md:col-span-2">
                    <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Utensils className="h-5 w-5 text-orange-500" />
                            Daily Intake Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="relative h-40 w-40 shrink-0">
                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                    <circle className="text-gray-100 dark:text-gray-800 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                                    <circle className="text-orange-500 progress-ring stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * Math.min(totalCalories / 2200, 1))} transform="rotate(-90 50 50)"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{totalCalories}</span>
                                    <span className="text-xs text-gray-500 font-medium">/ 2,200 kcal</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 flex-1 w-full text-center md:text-left">
                                {[
                                    { label: "Carbs", val: "150g", target: "250g", color: "bg-blue-500" },
                                    { label: "Protein", val: "85g", target: "120g", color: "bg-rose-500" },
                                    { label: "Fat", val: "40g", target: "65g", color: "bg-amber-500" },
                                ].map((macro) => (
                                    <div key={macro.label}>
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <div className={`w-3 h-3 rounded-full ${macro.color}`}></div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{macro.label}</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{macro.val}</p>
                                        <p className="text-xs text-gray-500">of {macro.target}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <Button size="sm" variant="outline" className="gap-2" onClick={() => alert("Nutrition Guide coming soon!")}>
                                <Info className="h-4 w-4" /> Nutrition Guide
                            </Button>
                            <Button size="sm" className="gap-2" onClick={() => setShowAddForm(!showAddForm)}>
                                <Plus className="h-4 w-4" /> Log Meal
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Real-time Hydration Reminder */}
                <Card className="bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/20 border-blue-100 dark:border-blue-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                            <Droplet className="h-5 w-5 text-blue-500" />
                            Hydration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-blue-800/80 dark:text-blue-200/80 mb-6">
                            You're doing great! Keep drinking water to stay focused.
                        </p>
                        <div className="flex justify-center gap-1 mb-8 flex-wrap">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`cursor-pointer w-8 h-10 rounded-t-sm rounded-b-xl transition-colors ${i < hydration
                                        ? "bg-blue-500 shadow-md shadow-blue-500/40"
                                        : "bg-blue-200/50 dark:bg-blue-800/50"
                                        }`}
                                    onClick={() => setHydration(i === hydration - 1 ? i : i + 1)}
                                />
                            ))}
                        </div>
                        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                            {hydration} <span className="text-lg text-blue-600/60 dark:text-blue-400/60 font-medium">/ 8 glasses</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* BMI Calculator */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="h-5 w-5 text-purple-500" />
                            BMI Calculator
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateBmi} className="grid sm:grid-cols-2 gap-4 items-end mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Weight (kg)</label>
                                <Input name="weight" type="number" required placeholder="e.g. 70" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Height (cm)</label>
                                <Input name="height" type="number" required placeholder="e.g. 175" />
                            </div>
                            <Button type="submit" className="sm:col-span-2">Calculate BMI</Button>
                        </form>

                        {bmi !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center"
                            >
                                <p className="text-sm text-gray-500 mb-1">Your BMI is</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{bmi}</p>
                                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${bmi < 18.5 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                                    bmi < 25 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                                        "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                                    }`}>
                                    {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : "Overweight"}
                                </span>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                {/* Nutrition Logs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Apple className="h-5 w-5 text-emerald-500" />
                            Nutrition Logs
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={loadLogs}>
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {showAddForm && (
                            <motion.form 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3 mb-4"
                                onSubmit={handleAddLog}
                            >
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 mt-1 block">Food eaten</label>
                                    <Input 
                                        value={newMeal} 
                                        onChange={(e) => setNewMeal(e.target.value)} 
                                        placeholder="E.g., Banana" 
                                        required 
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 mt-1 block">Calories</label>
                                    <Input 
                                        type="number" 
                                        value={newCalories} 
                                        onChange={(e) => setNewCalories(e.target.value)} 
                                        placeholder="Kcal amount" 
                                        required 
                                        className="bg-white"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
                                    <Button type="submit" size="sm" className="gap-2" disabled={isSaving}>
                                        <Save className="h-4 w-4" /> Save
                                    </Button>
                                </div>
                            </motion.form>
                        )}

                        {error && !loading && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {!loading && !error && logs.length === 0 && !showAddForm && (
                            <div className="text-center py-6 text-gray-500 bg-white dark:bg-surface-dark border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                No logs today. Add your first meal!
                            </div>
                        )}

                        {!loading && !error && logs.length > 0 && (
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                                                {log.mealType ? log.mealType[0] : 'S'}
                                            </div>
                                            <div>
                                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{log.mealType}</p>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">{log.notes || "Recorded Meal"}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{log.calories}</p>
                                            <p className="text-xs text-gray-500">kcal</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
