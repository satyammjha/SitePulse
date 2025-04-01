import { Server, Users, Bell, ChevronRight, ShieldCheck, Coins, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Button } from '@/components/ui/button';

const steps = [
    {
        icon: Server,
        title: "Add Your Website",
        description: "Register your website in 30 seconds with our simple onboarding process",
        color: "from-blue-100/50 to-blue-200/30 dark:from-blue-900/20 dark:to-blue-800/30",
        badge: null
    },
    {
        icon: Users,
        title: "Global Validators Activate",
        description: "Decentralized network monitoring from multiple worldwide locations",
        color: "from-purple-100/50 to-purple-200/30 dark:from-purple-900/20 dark:to-purple-800/30",
        badge: null
    },
    {
        icon: Bell,
        title: "Real-Time Insights",
        description: "Instant alerts and detailed analytics through preferred channels",
        color: "from-green-100/50 to-green-200/30 dark:from-green-900/20 dark:to-green-800/30",
        badge: null
    },
    {
        icon: ShieldCheck,
        title: "Become a Validator",
        description: "Stake crypto to verify uptime and earn rewards (Coming Soon)",
        color: "from-orange-100/50 to-orange-200/30 dark:from-orange-900/20 dark:to-orange-800/30",
        badge: "New Opportunity"
    }
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function HowItWorks() {
    return (
        <SectionWrapper className="relative overflow-hidden">
           
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute right-1/4 bottom-40 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute inset-0 bg-[url('/gradient-grid.svg')] bg-center opacity-10 dark:opacity-5" />
            </div>

            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Decentralized Monitoring
                            </span>{' '}
                            Network
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
                            Blockchain-powered monitoring with crypto incentives for network participants
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative group"
                        >
                            <div className={`p-8 rounded-2xl bg-gradient-to-br ${step.color} border border-slate-200/50 dark:border-slate-700 hover:shadow-2xl transition-all h-full flex flex-col`}>
                                {step.badge && (
                                    <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full backdrop-blur-sm shadow-sm">
                                        {step.badge}
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm">
                                        <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900/50 dark:text-slate-100/50">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {step.description}
                                    </p>
                                </div>

                                {step.title.includes("Validator") ? (
                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/30">
                                            <Coins className="h-5 w-5 text-yellow-500" />
                                            <div>
                                                <p className="text-sm font-medium">Stake to Participate</p>
                                                <p className="text-xs text-slate-500">Minimum 500 $DCLD</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/30">
                                            <Zap className="h-5 w-5 text-green-500" />
                                            <div>
                                                <p className="text-sm font-medium">Estimated APY</p>
                                                <p className="text-xs text-slate-500">8-12% Returns</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 relative overflow-hidden"
                                            disabled
                                        >
                                            <span className="relative z-10">Coming Soon</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-shimmer" />
                                        </Button>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="flex items-center text-blue-600 dark:text-blue-400 font-medium mt-6 group"
                                    >
                                        <span className="border-b border-transparent group-hover:border-blue-600 transition-all">
                                            Learn More
                                        </span>
                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-slate-700/50 -z-10" />

                <div className="absolute left-1/2 top-1/3 -translate-x-1/2">
                    <Sparkles className="h-24 w-24 text-purple-500/20 animate-pulse-slow" />
                </div>
            </div>
        </SectionWrapper>
    );
}