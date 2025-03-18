import { Globe, Shield, Bell, Zap, Clock, Server, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const features = [
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Monitor from 50+ worldwide locations with our distributed validator network",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/20"
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable uptime records stored on decentralized ledger technology",
    bgColor: "bg-green-100/50 dark:bg-green-900/20"
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Real-time notifications via email, SMS, and webhooks when issues detected",
    bgColor: "bg-purple-100/50 dark:bg-purple-900/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "30-second check intervals with sub-second response times",
    bgColor: "bg-yellow-100/50 dark:bg-yellow-900/20"
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock surveillance with automatic failover checks",
    bgColor: "bg-pink-100/50 dark:bg-pink-900/20"
  },
  {
    icon: Server,
    title: "API Access",
    description: "Full REST API integration with detailed documentation",
    bgColor: "bg-orange-100/50 dark:bg-orange-900/20"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise-Grade Monitoring
              <span className="text-blue-600 dark:text-blue-400"> Features</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to ensure maximum uptime and performance for your critical web assets
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-transparent dark:bg-slate-800/30 hover:border-blue-500/30 transition-colors group">
                <CardHeader className="pb-0">
                  <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[20%] top-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute right-[20%] top-[50%] w-[400px] h-[400px] bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </SectionWrapper>
  );
}