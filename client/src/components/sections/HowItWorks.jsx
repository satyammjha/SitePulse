import { Server, Users, Bell, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
// import networkMap from '@/public/network-map.svg';

const steps = [
    {
        icon: Server,
        title: "1. Add Your Website",
        description: "Register your website in 30 seconds with our simple onboarding process",
        color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
        icon: Users,
        title: "2. Global Validators Activate",
        description: "Our decentralized network begins monitoring from multiple locations worldwide",
        color: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
        icon: Bell,
        title: "3. Receive Real-Time Insights",
        description: "Get instant alerts and detailed analytics through your preferred channels",
        color: "bg-green-100 dark:bg-green-900/30"
    }
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function HowItWorks() {
    return (
        <SectionWrapper className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            How Our
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                {' '}Decentralized Network
                            </span>{' '}Works
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Transparent, blockchain-powered monitoring process in three simple steps
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/3 -right-24 w-24 h-px bg-slate-200 dark:bg-slate-700" />
                            )}

                            <div className={`p-8 rounded-2xl ${step.color} transition-all hover:shadow-lg dark:hover:bg-opacity-20`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                                        <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {step.description}
                                </p>
                                <button className="flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                                    Learn More
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-5xl mx-auto"
                >
                    <div className="relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-xl">
                        {/* <img
              src={networkMap}
              alt="Global network visualization"
              className="w-full h-auto"
            /> */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-pulse">
                                <div className="w-48 h-48 rounded-full bg-blue-600/10 dark:bg-blue-400/10" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            
            </div>
        </SectionWrapper>
    );
}