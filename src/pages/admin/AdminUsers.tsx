import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import {
    Search, Filter, Plus,
    Edit, Trash2, Eye, ChevronLeft, ChevronRight, X, Loader2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllUsers, addUser, updateUser } from "../../services/userService";
import { deleteUser } from "../../services/adminService";
import type { User } from "../../types";

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
    const [currentPage, setCurrentPage] = useState(1);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    
    // Form State
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState<"student" | "admin">("student");

    const itemsPerPage = 5;

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getAllUsers();
            setUsers(data);
        } catch {
            setError("Failed to fetch users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter and Search logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || user.status === filterStatus || (!user.status && filterStatus === "active");
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const toggleStatus = async (id: number, currentStatus: string | undefined) => {
        const newStatus = currentStatus === "inactive" ? "active" : "inactive";
        try {
            await updateUser(id, { status: newStatus });
            setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
        } catch {
            alert("Failed to update status.");
        }
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        setIsActionLoading(true);
        try {
            await deleteUser(userToDelete);
            setUsers(users.filter(u => u.id !== userToDelete));
            setDeleteModalOpen(false);
        } catch {
            alert("Failed to delete user.");
        } finally {
            setIsActionLoading(false);
            setUserToDelete(null);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newEmail) return;

        setIsActionLoading(true);
        try {
            const newUser = await addUser({
                name: newName,
                email: newEmail,
                role: newRole,
                status: "active",
                joinDate: new Date().toISOString()
            });
            setUsers([newUser, ...users]);
            setIsAddModalOpen(false);
            setNewName("");
            setNewEmail("");
            setNewRole("student");
        } catch {
            alert("Failed to add user.");
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        User Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage students and administrators across the platform.
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shrink-0">
                    <Plus className="h-4 w-4" /> Add User
                </Button>
            </div>

            <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search users by name or email..."
                                className="pl-9 border-gray-200"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                className="h-10 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300"
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value as "all" | "active" | "inactive");
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
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
                            <Button onClick={fetchUsers} variant="outline">Try Again</Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">User Details</th>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Joined</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {displayedUsers.length > 0 ? displayedUsers.map((user) => (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={user.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-surface-dark dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 flex items-center justify-center font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                        <div className="text-gray-500 text-xs">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-300">{user.role}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStatus(user.id, user.status)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                        (!user.status || user.status === 'active')
                                                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}
                                                >
                                                    {user.status || 'active'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Profile">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit User">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                                                        onClick={() => { setUserToDelete(user.id); setDeleteModalOpen(true); }} title="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                No users found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>

                {totalPages > 1 && !isLoading && !error && (
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-800/20">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Add User Modal inline for simple overlay */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form onSubmit={handleAddUser}>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <Input required value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <Input required type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                        <select
                                            value={newRole}
                                            onChange={e => setNewRole(e.target.value as "student" | "admin")}
                                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark text-gray-700 dark:text-gray-300"
                                        >
                                            <option value="student">Student</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
                                    <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isActionLoading}>
                                        {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create User'}
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
                title="Delete User"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this user? This action cannot be undone.
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
