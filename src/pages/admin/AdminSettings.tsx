import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Save, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: "CampusCare Wellness",
        supportEmail: "support@campuscare.edu",
        maintenanceMode: false,
        allowSignups: true,
        notifyOnEmergency: true,
    });

    useEffect(() => {
        const saved = localStorage.getItem("admin-settings");
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSave = () => {
        localStorage.setItem("admin-settings", JSON.stringify(settings));
        alert("Settings saved successfully!");
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Platform Settings
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Configure global application preferences and maintenance modes.
                    </p>
                </div>
                <Button onClick={handleSave} className="gap-2 shrink-0">
                    <Save className="h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Globe className="h-5 w-5 text-primary-500" /> General
                        </CardTitle>
                        <p className="text-sm text-gray-500">Basic platform branding and contact info.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
                            <Input 
                                name="siteName" 
                                value={settings.siteName} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                            <Input 
                                name="supportEmail" 
                                type="email" 
                                value={settings.supportEmail} 
                                onChange={handleChange} 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications & Alerts */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Bell className="h-5 w-5 text-amber-500" /> Notifications
                        </CardTitle>
                        <p className="text-sm text-gray-500">Manage how alerts are routed to admins.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Emergency Alerts</p>
                                <p className="text-xs text-gray-500 mt-1">Notify all admins immediately on crisis requests</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="notifyOnEmergency" checked={settings.notifyOnEmergency} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                            </div>
                        </label>
                    </CardContent>
                </Card>

                {/* Security & Access */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Shield className="h-5 w-5 text-emerald-500" /> Security & Access
                        </CardTitle>
                        <p className="text-sm text-gray-500">Control who can access and register for the platform.</p>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 bg-white dark:bg-surface-dark cursor-pointer transition-colors">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Allow New Signups</p>
                                <p className="text-xs text-gray-500 mt-1">Students can register themselves</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="allowSignups" checked={settings.allowSignups} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                            </div>
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-xl border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800 bg-rose-50/30 dark:bg-rose-900/10 cursor-pointer transition-colors">
                            <div>
                                <p className="font-medium text-rose-900 dark:text-rose-100">Maintenance Mode</p>
                                <p className="text-xs text-rose-500 mt-1">Disables access for non-admins</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                            </div>
                        </label>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
