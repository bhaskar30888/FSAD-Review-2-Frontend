import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import {
    Search, Plus, Edit, Trash2, Calendar as CalendarIcon, Users, Clock, Loader2, AlertCircle, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPrograms, createProgram, updateProgram, deleteProgram } from "../../services/programService";
import type { Program } from "../../types";

export default function AdminPrograms() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // API State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    
    // Modal State
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [programToEdit, setProgramToEdit] = useState<Program | null>(null);
    const [programToDelete, setProgramToDelete] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        instructor: "",
        schedule: "",
        capacity: "",
    });

    const fetchPrograms = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getPrograms();
            setPrograms(data);
        } catch {
            setError("Failed to fetch programs.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const filteredPrograms = programs.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddModal = () => {
        setProgramToEdit(null);
        setFormData({ title: "", description: "", instructor: "", schedule: "", capacity: "" });
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (p: Program) => {
        setProgramToEdit(p);
        setFormData({
            title: p.title,
            description: p.description,
            instructor: p.instructor || "",
            schedule: p.schedule || "",
            capacity: p.capacity ? String(p.capacity) : "",
        });
        setIsAddEditModalOpen(true);
    };

    const confirmDelete = async () => {
        if (programToDelete === null) return;
        setIsActionLoading(true);
        try {
            await deleteProgram(programToDelete);
            setPrograms(programs.filter(p => p.id !== programToDelete));
            setDeleteModalOpen(false);
        } catch {
            alert("Failed to delete program.");
        } finally {
            setIsActionLoading(false);
            setProgramToDelete(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description) return;

        setIsActionLoading(true);
        try {
            const dataToSave = {
                title: formData.title,
                description: formData.description,
                instructor: formData.instructor,
                schedule: formData.schedule,
                capacity: formData.capacity ? Number(formData.capacity) : undefined,
            };

            if (programToEdit) {
                const updated = await updateProgram(programToEdit.id, dataToSave);
                setPrograms(programs.map(p => p.id === programToEdit.id ? updated : p));
            } else {
                const created = await createProgram(dataToSave);
                setPrograms([created, ...programs]);
            }
            setIsAddEditModalOpen(false);
        } catch {
            alert("Failed to save program.");
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Program Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage wellness programs, group fitness, and therapy sessions.
                    </p>
                </div>
                <Button onClick={openAddModal} className="gap-2 shrink-0">
                    <Plus className="h-4 w-4" /> Create Program
                </Button>
            </div>

            <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search programs..."
                                className="pl-9 border-gray-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 relative min-h-[300px]">
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-surface-dark/50 z-10">
                            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mb-2 opacity-20" />
                            <p className="text-red-500 mb-4">{error}</p>
                            <Button onClick={fetchPrograms} variant="outline">Try Again</Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Program Details</th>
                                        <th className="px-6 py-4 font-medium">Instructor</th>
                                        <th className="px-6 py-4 font-medium">Schedule</th>
                                        <th className="px-6 py-4 font-medium">Enrollment</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {filteredPrograms.length > 0 ? filteredPrograms.map((program) => (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={program.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-surface-dark dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 max-w-[250px]">
                                                <div className="font-medium text-gray-900 dark:text-white line-clamp-1" title={program.title}>{program.title}</div>
                                                <div className="text-gray-500 text-xs line-clamp-1 mt-0.5" title={program.description}>{program.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {program.instructor || <span className="text-gray-400 italic">Not Assigned</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span className="line-clamp-1">{program.schedule || "TBD"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-primary-500" />
                                                    <span className="text-gray-700 dark:text-gray-200 font-medium">{program.enrolled || 0}</span>
                                                    <span className="text-gray-400 text-xs">/ {program.capacity || "∞"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit Program" onClick={() => openEditModal(program)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                                                        onClick={() => { setProgramToDelete(program.id); setDeleteModalOpen(true); }} title="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                No programs found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add / Edit Program Modal */}
            <AnimatePresence>
                {isAddEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {programToEdit ? "Edit Program" : "Create New Program"}
                                </h2>
                                <button onClick={() => setIsAddEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Program Title</label>
                                        <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Mindfulness Meditation" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300 h-24 resize-none" placeholder="Program overview..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor (Optional)</label>
                                            <Input value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} placeholder="Jane Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Capacity</label>
                                            <Input type="number" min="1" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} placeholder="Unlimited if empty" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Details</label>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input className="pl-9" value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} placeholder="e.g., Mondays at 6:00 PM" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
                                    <Button type="button" variant="ghost" onClick={() => setIsAddEditModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isActionLoading}>
                                        {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Program"}
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
                title="Delete Program"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this program? Enrolled students will be removed. This action cannot be undone.
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
