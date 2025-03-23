import { ChevronRight, Globe, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '../layouts/SectionWrapper';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <SectionWrapper className="relative pt-10 pb-28 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <div className="p-2 bg-white dark:bg-slate-700 rounded-full">
                <Zap className="h-5 w-5 text-blue-600 dark:text-yellow-400 animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Blockchain-Powered Monitoring
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
            >
              Never Miss Downtime with{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -skew-y-3 scale-105 opacity-30 blur-2xl" />
                <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Real-Time Alerts
                </span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Monitor your website's uptime across <span className="font-semibold text-slate-900 dark:text-white">50+ global locations</span> with blockchain-verified status reports. Get instant alerts and detailed analytics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Button 
                size="lg" 
                className="h-14 text-lg px-8 transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 text-lg px-8 border-slate-300 dark:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-transform hover:scale-105"
              >
                See Live Demo
              </Button>
            </motion.div>
          </div>

          <div className="relative lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-xl rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800 transform perspective-1000 rotate-x-5"
            >
              <img
                src="/dashboard.png"
                alt="Dashboard Preview"
                className="w-full h-auto object-cover"
              />
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
              </div>
            </motion.div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3 backdrop-blur-sm hover:shadow-xl transition-all"
              >
                <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">50+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Global Nodes</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3 backdrop-blur-sm hover:shadow-xl transition-all"
              >
                <div className="p-2 bg-green-50 dark:bg-slate-800 rounded-lg">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monitoring</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}