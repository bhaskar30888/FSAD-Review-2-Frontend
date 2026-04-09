import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
    MessageCircle,
    CalendarPlus,
    Brain,
    PlayCircle,
    Send,
    FileText,
    Link as LinkIcon,
    RefreshCw,
    AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { getResources } from "../../services/resourceService";
import type { Resource } from "../../types";

export function MentalHealth() {
    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hi there! I'm your anonymous support buddy. How are you feeling today?", sender: "bot" }
    ]);
    
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadResources = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getResources();
            // Filter mental health resources specifically if we want, or just show all
            // The prompt says "MentalHealth.tsx -> Load: getResources() on mount -> Display resource cards"
            setResources(data);
        } catch {
            setError("Failed to load resources.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadResources();
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        setMessages([...messages, { text: chatMessage, sender: "user" }]);
        setChatMessage("");

        setTimeout(() => {
            setMessages(prev => [...prev, { text: "I hear you. Taking things one step at a time is completely okay. Can I help you with any specific resources?", sender: "bot" }]);
        }, 1000);
    };

    const getResourceIcon = (type: string) => {
        if (type === 'video') return <PlayCircle className="w-5 h-5" />;
        if (type === 'article') return <FileText className="w-5 h-5" />;
        return <LinkIcon className="w-5 h-5" />;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Mental Health & Well-being
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Resources, support, and tools to help you navigate your mental health seamlessly.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Assessment Quiz */}
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-100 dark:border-indigo-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                            <Brain className="h-5 w-5 text-indigo-500" />
                            Stress Assessment
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6 text-sm text-indigo-800/80 dark:text-indigo-200/80">
                            Take our 2-minute self-assessment to gauge your current stress levels and receive personalized recommendations.
                        </p>
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-lg shadow-indigo-500/20"
                            onClick={() => alert("Starting stress assessment quiz...")}
                        >
                            Start Quiz
                        </Button>
                    </CardContent>
                </Card>

                {/* Book Counseling */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarPlus className="h-5 w-5 text-primary-500" />
                            Book a Session
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Session requested!'); }}>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Session Type</label>
                                <select className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark">
                                    <option>Initial Consultation (15m)</option>
                                    <option>Standard Therapy (45m)</option>
                                    <option>Group Support (60m)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Preferred Date</label>
                                <Input type="date" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Request Appointment
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Anonymous Chat UI */}
                <Card className="flex flex-col md:col-span-2 lg:col-span-1 h-[400px]">
                    <CardHeader className="border-b border-gray-100 pb-4 dark:border-gray-800">
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-blue-500" />
                            Anonymous Peer Chat
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                                        ? "bg-primary-600 text-white rounded-tr-none"
                                        : "bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-tl-none shadow-sm"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-4 bg-white border-t border-gray-100 dark:bg-surface-dark dark:border-gray-800">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Input
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    placeholder="Type anonymously..."
                                    className="rounded-full bg-gray-50 dark:bg-gray-900 border-0 focus-visible:ring-1"
                                />
                                <Button type="submit" size="sm" className="rounded-full w-10 h-10 p-0 flex-shrink-0">
                                    <Send className="h-4 w-4 ml-0.5" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* API Fetched Resources */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Wellness Resources
                    </h2>
                </div>
                
                {loading && (
                    <div className="flex justify-center p-8">
                        <RefreshCw className="h-8 w-8 text-primary-500 animate-spin" />
                    </div>
                )}

                {error && !loading && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-between col-span-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={loadResources}>Retry</Button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.length > 0 ? resources.map((resource) => (
                            <motion.div
                                whileHover={{ y: -5 }}
                                key={resource.id}
                                className="group cursor-pointer bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
                                onClick={() => window.open(resource.url, '_blank')}
                            >
                                <div className="h-32 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-500">
                                    {getResourceIcon(resource.type)}
                                </div>
                                <div className="p-4">
                                    <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                                        {resource.category} • {resource.type}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                                        {resource.title}
                                    </h3>
                                    {resource.description && (
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {resource.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center py-8 text-gray-500 bg-white dark:bg-surface-dark border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                No resources available at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
