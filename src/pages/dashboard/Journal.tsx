import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Smile, Meh, Frown, Save, BookOpen, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getJournals, createJournal, deleteJournal } from "../../services/journalService";
import type { Journal as JournalType } from "../../types";

export function Journal() {
    const [journalEntries, setJournalEntries] = useState<JournalType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedMood, setSelectedMood] = useState<"good" | "neutral" | "bad" | null>(null);
    const [newContent, setNewContent] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const loadJournals = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getJournals();
            setJournalEntries(data);
        } catch {
            setError("Failed to load journal entries.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJournals();
    }, []);

    const handleSave = async () => {
        if (!selectedMood) {
            alert("Please select a mood!");
            return;
        }
        if (!newContent.trim()) {
            alert("Please write something in your journal!");
            return;
        }

        try {
            const newEntry = await createJournal({
                date: new Date().toISOString(),
                mood: selectedMood,
                content: newContent
            });
            setJournalEntries([newEntry, ...journalEntries]);
            setNewContent("");
            setSelectedMood(null);
        } catch {
            alert("Failed to save entry.");
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteJournal(deleteId);
                setJournalEntries(journalEntries.filter(j => j.id !== deleteId));
                setDeleteId(null);
            } catch {
                alert("Failed to delete entry.");
            }
        }
    };

    const getMoodIcon = (mood: string) => {
        if (mood === "good") return <Smile className="h-6 w-6 text-emerald-500" />;
        if (mood === "bad") return <Frown className="h-6 w-6 text-rose-500" />;
        return <Meh className="h-6 w-6 text-amber-500" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Personal Journal
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track your daily mood and thoughts securely.
                    </p>
                </div>
            </div>

            <Card className="border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-surface-dark">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary-500" />
                        New Entry
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">How are you feeling today?</label>
                        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                            <button
                                onClick={() => setSelectedMood("good")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all flex-1 min-w-[100px] ${selectedMood === "good" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <Smile className={`h-8 w-8 mb-2 ${selectedMood === "good" ? "text-emerald-500" : "text-gray-400"}`} />
                                <span className={`text-sm font-medium ${selectedMood === "good" ? "text-emerald-700 dark:text-emerald-400" : "text-gray-500"}`}>Great</span>
                            </button>
                            <button
                                onClick={() => setSelectedMood("neutral")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all flex-1 min-w-[100px] ${selectedMood === "neutral" ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" : "border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <Meh className={`h-8 w-8 mb-2 ${selectedMood === "neutral" ? "text-amber-500" : "text-gray-400"}`} />
                                <span className={`text-sm font-medium ${selectedMood === "neutral" ? "text-amber-700 dark:text-amber-400" : "text-gray-500"}`}>Okay</span>
                            </button>
                            <button
                                onClick={() => setSelectedMood("bad")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all flex-1 min-w-[100px] ${selectedMood === "bad" ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20" : "border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <Frown className={`h-8 w-8 mb-2 ${selectedMood === "bad" ? "text-rose-500" : "text-gray-400"}`} />
                                <span className={`text-sm font-medium ${selectedMood === "bad" ? "text-rose-700 dark:text-rose-400" : "text-gray-500"}`}>Struggling</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Journal Note</label>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Write your thoughts here..."
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300 min-h-[120px] resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="h-4 w-4" /> Save Entry
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Past Entries</h2>
                
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
                        <Button variant="outline" size="sm" onClick={loadJournals}>Retry</Button>
                    </div>
                )}

                {!loading && !error && (
                    <AnimatePresence>
                        {journalEntries.length > 0 ? journalEntries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                layout
                            >
                                <Card className="border border-gray-200 dark:border-gray-800 shadow-sm relative group">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => setDeleteId(entry.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <CardContent className="p-5 flex gap-4">
                                        <div className="shrink-0 pt-1">
                                            {getMoodIcon(entry.mood)}
                                        </div>
                                        <div className="space-y-1 w-full pr-8">
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                            <p className="text-gray-800 dark:text-gray-200">
                                                {entry.content}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )) : (
                            <div className="text-center py-8 text-gray-500 bg-white dark:bg-surface-dark border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                No journal entries yet. Start writing one above!
                            </div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <Modal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                title="Delete Journal Entry"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this specific journal entry? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

