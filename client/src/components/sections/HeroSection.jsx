import { ChevronRight, Globe, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '../layouts/SectionWrapper';

export default function HeroSection() {
  return (
    <SectionWrapper className="relative pt-28 pb-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6 p-3 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Blockchain-Powered Monitoring
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Never Miss Downtime with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Real-Time Alerts
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 mb-10 max-w-xl mx-auto lg:mx-0">
              Monitor your website's uptime across 50+ global locations with blockchain-verified status reports.
              Get instant alerts and detailed analytics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="h-14 text-lg px-8 ">
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 text-lg px-8 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                See Live Demo
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-lg rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800">
              <img
                src="/dashboard.jpg"
                alt="Dashboard Preview"
                className="w-full h-auto"
              />

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -right-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <Globe className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">50+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Global Locations</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="h-7 w-7 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}