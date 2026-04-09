import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import {
    Plus, Trash2, Link as LinkIcon, Video,
    Heart, Activity, Apple, Search, ArrowRight, X, Loader2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getResources, createResource, deleteResource } from "../../services/resourceService";
import type { Resource } from "../../types";

export default function AdminResources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // API State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    
    // Delete Modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState<number | null>(null);

    // Form State
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Mental Health");
    const [newType, setNewType] = useState<"video" | "link">("video");
    const [newUrl, setNewUrl] = useState("");
    const [newDesc, setNewDesc] = useState("");

    const fetchResources = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getResources();
            setResources(data);
        } catch {
            setError("Failed to fetch resources.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const filteredResources = resources.filter(res =>
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const confirmDelete = async () => {
        if (resourceToDelete === null) return;
        setIsActionLoading(true);
        try {
            await deleteResource(resourceToDelete);
            setResources(resources.filter(r => r.id !== resourceToDelete));
            setDeleteModalOpen(false);
        } catch {
            alert("Failed to delete resource.");
        } finally {
            setIsActionLoading(false);
            setResourceToDelete(null);
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newUrl) return;

        setIsActionLoading(true);
        try {
            const newRes = await createResource({
                title: newTitle,
                category: newCategory,
                type: newType,
                url: newUrl,
                description: newDesc,
                addedBy: "Admin",
                dateAdded: new Date().toISOString().split('T')[0]
            });

            setResources([newRes, ...resources]);
            setIsAddModalOpen(false);
            setNewTitle("");
            setNewCategory("Mental Health");
            setNewType("video");
            setNewUrl("");
            setNewDesc("");
        } catch {
            alert("Failed to create resource.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case "Mental Health": return <Heart className="h-5 w-5 text-rose-500" />;
            case "Fitness": return <Activity className="h-5 w-5 text-emerald-500" />;
            case "Nutrition": return <Apple className="h-5 w-5 text-amber-500" />;
            case "Meditation": return <Heart className="h-5 w-5 text-indigo-500" />;
            default: return <LinkIcon className="h-5 w-5 text-primary-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Resource Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Curate and organize content for students across all wellness categories.
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shrink-0">
                    <Plus className="h-4 w-4" /> Add Resource
                </Button>
            </div>

            <div className="flex items-center relative max-w-md w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search resources..."
                    className="pl-9 h-12 bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {isLoading && (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                </div>
            )}
            
            {error && !isLoading && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchResources}>Retry</Button>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence>
                        {filteredResources.length > 0 ? filteredResources.map((resource) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={resource.id}
                            >
                                <Card className="h-full flex flex-col border border-gray-200 hover:border-primary-200 dark:border-gray-800 dark:hover:border-primary-800 transition-colors shadow-sm bg-white dark:bg-surface-dark group">
                                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                                {getCategoryIcon(resource.category)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">{resource.category}</p>
                                                <CardTitle className="text-lg line-clamp-1 mt-0.5 max-w-[200px]" title={resource.title}>{resource.title}</CardTitle>
                                            </div>
                                        </div>
                                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                                                onClick={() => { setResourceToDelete(resource.id); setDeleteModalOpen(true); }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col justify-between pt-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                            {resource.description || "No description provided."}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                                {resource.type === 'video' ? <Video className="h-3.5 w-3.5" /> : <LinkIcon className="h-3.5 w-3.5" />}
                                                <span className="capitalize">{resource.type} Content</span>
                                            </div>
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1 text-sm font-medium">
                                                View <ArrowRight className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 border-dashed rounded-xl">
                                No resources found.
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Add Resource Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Resource</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form onSubmit={handleAddSubmit}>
                                <div className="p-6 space-y-4 whitespace-normal">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                        <Input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g., Quick 5-min Meditation" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300">
                                                <option>Mental Health</option>
                                                <option>Fitness</option>
                                                <option>Nutrition</option>
                                                <option>Meditation</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Type</label>
                                            <select value={newType} onChange={e => setNewType(e.target.value as "video" | "link")} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300">
                                                <option value="video">Video</option>
                                                <option value="link">Link</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
                                        <Input required value={newUrl} onChange={e => setNewUrl(e.target.value)} type="url" placeholder="https://" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300 h-24 resize-none" placeholder="Brief summary of the resource..." />
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
                                    <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isActionLoading}>
                                        {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Resource"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Modal 
                isOpen={deleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                title="Delete Resource"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this resource? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" disabled={isActionLoading} onClick={confirmDelete}>
                            {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
