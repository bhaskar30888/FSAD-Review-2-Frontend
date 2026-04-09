import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: "Hi there! I'm Aura, your AI wellness companion. How are you feeling today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "I hear you. Remember that it's okay to take a break. Would you like me to suggest a short meditation or some breathing exercises?" }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 right-0 w-[350px] bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
                        style={{ height: '450px' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-primary-600 dark:bg-primary-900 border-b border-primary-700/50">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Aura AI</h3>
                                    <p className="text-xs text-primary-100">Always here to help</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-black/10">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                            ? 'bg-primary-500 text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
                            <form onSubmit={handleSend} className="flex items-center gap-2">
                                <Input
                                    className="flex-1 rounded-full h-10 border-gray-200 dark:border-gray-700"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button type="submit" size="sm" className="h-10 w-10 rounded-full p-0 flex items-center justify-center shrink-0">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 bg-gradient-to-tr from-primary-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center outline-none focus:ring-4 focus:ring-primary-500/30 transition-shadow"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.button>
        </div>
    );
}
