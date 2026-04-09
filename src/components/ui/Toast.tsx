import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
    message: string;
    duration?: number;
}

export function Toast({ message, duration = 5000 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [isVisible, duration]);

    return (
        <div className="fixed top-20 right-6 z-50">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900/30 shadow-lg rounded-xl p-4 flex items-center gap-3 w-[300px]"
                    >
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{message}</p>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
