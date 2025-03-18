
import { Rocket, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Button } from '../ui/button';

export default function CtaSection() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Start Monitoring in 30 Seconds
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 max-w-3xl mx-auto">
            Ready to Ensure Your Website's
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}100% Uptime?
            </span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and businesses already monitoring their websites with UptimeChain. 
            Get started free - no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 text-lg px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 text-lg px-8 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-slate-600 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-0 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </SectionWrapper>
  );
}