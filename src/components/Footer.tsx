import { Link } from "react-router-dom";
import { HeartPulse, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-surface-dark">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <HeartPulse className="h-6 w-6 text-primary-500" />
                            <span className="text-xl font-bold tracking-tight text-primary-900 dark:text-primary-100">
                                CampusCare
                            </span>
                        </Link>
                        <p className="mb-6 max-w-sm text-gray-600 dark:text-gray-400">
                            An industry-leading student health and wellness platform designed to prioritize mental and physical well-being.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
                            <li><Link to="/resources" className="hover:text-primary-500 transition-colors">Resources</Link></li>
                            <li><Link to="/programs" className="hover:text-primary-500 transition-colors">Programs</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} CampusCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
