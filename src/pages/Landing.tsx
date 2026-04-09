import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import {
    Heart,
    Brain,
    Activity,
    ShieldCheck,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Footer } from "../components/Footer";

export default function Landing() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-24 pb-32 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
                        Welcome to the future of student wellness
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 md:text-7xl lg:text-8xl"
                    >
                        Your Wellness, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 dark:from-primary-400 dark:to-secondary-400">
                            Your Priority
                        </span>
                    </motion.h1>

                    <motion.p
                        {...fadeIn} transition={{ delay: 0.1 }}
                        className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
                    >
                        An all-in-one health and wellness platform designed exclusively for students to thrive—focusing on mental health, fitness, and nutrition.
                    </motion.p>

                    <motion.div
                        {...fadeIn} transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/login">
                            <Button size="lg" className="gap-2 w-full sm:w-auto">
                                Get Started <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Why CampusCare */}
            <section className="py-24 bg-white dark:bg-surface-dark">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            Why CampusCare?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Everything you need to balance academics and personal well-being.
                        </p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {[
                            { icon: Brain, title: "Mental Health", desc: "Access professional counseling and guided meditations." },
                            { icon: Activity, title: "Fitness Programs", desc: "Tailored workout plans from beginner to advanced." },
                            { icon: Heart, title: "Nutrition", desc: "Healthy recipes and intuitive meal tracking." },
                            { icon: ShieldCheck, title: "Emergency Support", desc: "24/7 access to campus crisis hotlines and clinics." },
                        ].map((feature, i) => (
                            <motion.div key={i} variants={fadeIn}>
                                <Card className="h-full border-gray-100 bg-gray-50/50 hover:bg-white dark:border-gray-800 dark:bg-gray-800/10 dark:hover:bg-surface-dark transition-colors duration-300">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                                Simple, intuitive, and designed for your life.
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 mb-8">
                                We've stripped away the complexity so you can focus on building sustainable habits.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    "Create your personalized profile",
                                    "Take the stress-level self-assessment",
                                    "Get matched with recommended programs",
                                    "Track your progress daily"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 blur-3xl rounded-full"></div>
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
                                alt="Student Wellness"
                                className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white dark:bg-surface-dark">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-16">
                        Trusted by students nationwide
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { name: "Sarah M.", text: "CampusCare helped me manage finals stress perfectly.", role: "Junior" },
                            { name: "James L.", text: "The fitness routines are exactly what I needed to stay active.", role: "Freshman" },
                            { name: "Emily R.", text: "I love the nutrition hub. Meal planning is so easy now.", role: "Senior" }
                        ].map((test, i) => (
                            <Card key={i} className="text-left bg-gray-50/50 dark:bg-gray-800/10">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-2 mb-4 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
                                    </div>
                                    <p className="italic text-gray-600 dark:text-gray-400 mb-6 font-medium">"{test.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-primary-200 dark:bg-primary-900 rounded-full flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                                            {test.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{test.name}</p>
                                            <p className="text-sm text-gray-500">{test.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary-600 dark:bg-primary-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                        Ready to prioritize your wellness?
                    </h2>
                    <p className="text-primary-100 mb-10 text-lg max-w-2xl mx-auto">
                        Join thousands of students who have already transformed their daily routines.
                    </p>
                    <Link to="/login">
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                            Create Free Account
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
