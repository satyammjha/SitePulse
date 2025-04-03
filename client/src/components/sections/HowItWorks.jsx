import { Server, Users, Bell, ChevronRight, ShieldCheck, Coins, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
    {
        icon: Server,
        title: "Add Your Website",
        description: "Register your website in 30 seconds with our simple onboarding process",
        badge: null
    },
    {
        icon: Users,
        title: "Global Validators Activate",
        description: "Decentralized network monitoring from multiple worldwide locations",
        badge: null
    },
    {
        icon: Bell,
        title: "Real-Time Insights",
        description: "Instant alerts and detailed analytics through preferred channels",
        badge: null
    },
    {
        icon: ShieldCheck,
        title: "Become a Validator",
        description: "Stake crypto to verify uptime and earn rewards",
        badge: "New"
    }
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function HowItWorks() {
    return (
        <SectionWrapper>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight">
                        Decentralized Monitoring Network
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Blockchain-powered monitoring with crypto incentives for network participants
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-sm transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <step.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        {step.badge && <Badge variant="secondary">{step.badge}</Badge>}
                                    </div>
                                    <CardTitle className="mt-4 text-left">{step.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="text-left">
                                    <p className="text-muted-foreground">{step.description}</p>
                                </CardContent>

                                {step.title.includes("Validator") ? (
                                    <CardFooter className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-3 w-full">
                                            <Coins className="h-5 w-5 text-amber-500" />
                                            <div>
                                                <p className="text-sm">Stake to Participate</p>
                                                <p className="text-xs text-muted-foreground">Minimum 500 $DCLD</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full">
                                            <Zap className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <p className="text-sm">Estimated APY</p>
                                                <p className="text-xs text-muted-foreground">8-12% Returns</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-2"
                                            disabled
                                        >
                                            Coming Soon
                                        </Button>
                                    </CardFooter>
                                ) : (
                                    <CardFooter>
                                        <Button
                                            variant="link"
                                            className="pl-0 hover:pl-2 transition-all"
                                        >
                                            Learn More
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}