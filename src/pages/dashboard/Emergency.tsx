import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Phone, AlertTriangle, MapPin, Clock, MessageSquareWarning } from "lucide-react";
import { motion } from "framer-motion";

export function Emergency() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-rose-500" />
                    Emergency Support
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Immediate help is available. Do not hesitate to reach out if you or someone else is in danger.
                </p>
            </div>

            {/* Primary Hotline Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-500/20"
            >
                <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                        Campus Crisis Hotline (24/7)
                    </h2>
                    <p className="text-rose-100 max-w-xl">
                        For immediate, confidential support if you are experiencing a mental health crisis, feeling overwhelmed, or having thoughts of self-harm.
                    </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                    <a href="tel:911">
                        <Button size="lg" className="w-full bg-white text-rose-600 hover:bg-rose-50 shadow-lg text-lg px-8 py-6 h-auto font-bold flex gap-3">
                            <Phone className="h-6 w-6" />
                            1-800-CAMPUS-CARE
                        </Button>
                    </a>
                </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Key Contacts */}
                <Card className="border-rose-100 dark:border-rose-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            Campus Facilities
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "Student Health Center", hours: "Mon-Fri, 8AM - 6PM", phone: "(555) 123-4567", extra: "Walk-ins welcome" },
                            { name: "Counseling & Psychological Services", hours: "Mon-Fri, 9AM - 5PM", phone: "(555) 987-6543", extra: "After-hours on call" },
                            { name: "Campus Security", hours: "24/7 Available", phone: "(555) 111-2222", extra: "Emergency response" },
                        ].map((facility, idx) => (
                            <div key={idx} className="flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{facility.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" /> {facility.hours}
                                    </p>
                                    <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-1">{facility.extra}</p>
                                </div>
                                <Button variant="outline" size="sm" className="shrink-0 gap-2" onClick={() => alert(`Calling ${facility.phone}...`)}>
                                    <Phone className="h-4 w-4" /> Call
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Help Request Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquareWarning className="h-5 w-5 text-amber-500" />
                            Request Urgent Follow-up
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Submit this form, and a counselor or campus safety officer will reach out to you within 30 minutes.
                            <strong> If this is a life-threatening emergency, call 911 immediately.</strong>
                        </p>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully. Help is on the way.'); }}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Current Location
                                </label>
                                <Input required placeholder="e.g. North Dorms, Room 402" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nature of Situation
                                </label>
                                <select required className="flex w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark">
                                    <option value="">Select an option...</option>
                                    <option value="medical">Medical Emergency</option>
                                    <option value="mental">Mental Health Crisis</option>
                                    <option value="safety">Safety Concern</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Additional Context (Optional)
                                </label>
                                <textarea
                                    className="flex w-full min-h-[100px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-surface-dark resize-none"
                                    placeholder="Tell us what is happening..."
                                ></textarea>
                            </div>

                            <Button type="submit" variant="danger" className="w-full">
                                Submit Request
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
