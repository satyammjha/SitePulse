import { MonitorCheck, Globe, AlertCircle, Zap, Clock, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Start Monitoring with
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Zero Cost
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Full-featured monitoring experience with our forever-free plan. Scale when you're ready.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl"
          >
            <Card className="relative bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Community Favorite
              </div>
              <CardHeader className="text-center space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Free Forever
                  </h3>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white">
                    $0<span className="text-lg font-normal text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                >
                  Start Monitoring Now
                </Button>
              </CardHeader>

              <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-8">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <MonitorCheck className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">3 Websites</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Simultaneous monitoring</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <Globe className="h-6 w-6 text-green-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">5 Global Nodes</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Worldwide coverage</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Instant Alerts</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Email & Webhook notifications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">5-min Checks</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Real-time monitoring</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-pink-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">7-Day History</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Performance analytics</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900/30 rounded-lg">
                  <BarChart className="h-6 w-6 text-orange-500" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Basic Reports</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Weekly summaries</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-100 dark:border-slate-700 py-6">
                <div className="w-full text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    All features include our{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      99.99% monitoring accuracy guarantee
                    </span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Value Proposition */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No credit card required • 14-day free trial of premium features
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}