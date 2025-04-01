import React from 'react'
import { motion } from 'framer-motion'
import { Coins, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

const ValidatorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-900/80 dark:to-slate-800/30 p-6 lg:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-700 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-[url('/gradient-grid.svg')] bg-center opacity-10 dark:opacity-5" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-16">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Become a Network Validator
                <Sparkles className="inline-block ml-3 h-8 w-8 text-purple-600 animate-pulse" />
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Stake $DCLD tokens to verify website status and earn rewards.<br />
                Contribute to network security while earning passive income through decentralized validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/20">
                    <Coins className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Estimated APY</div>
                    <div className="text-xl font-semibold text-slate-900 dark:text-white">8-12%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                    <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Minimum Stake</div>
                    <div className="text-xl font-semibold text-slate-900 dark:text-white">500 $DCLD</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform transition-all hover:scale-[1.02] shadow-lg"
                  size="lg"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Join Waitlist
                </Button>
                <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">450+</span> validators registered
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: '55%' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Early Access Progress</span>
                  <span>55% Filled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[400px] xl:w-[450px] relative">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-xl" />
            
            <motion.div 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700"
            >
              <div className="absolute top-4 right-4">
                <Coins className="h-6 w-6 text-yellow-500 animate-float" />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Stake</span>
                    <div className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-md">
                      Active
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      500 <span className="text-xl text-slate-500 dark:text-slate-400">$DCLD</span>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      +42.6 $DCLD earned (30d)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Validation Accuracy</span>
                    <span>98.4%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-cyan-500"
                      style={{ width: '98.4%' }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Uptime Contribution</span>
                    <span>99.1%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-blue-500"
                      style={{ width: '99.1%' }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50/50 dark:bg-slate-700/30">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Estimated monthly rewards:
                    <div className="text-xl font-semibold text-slate-900 dark:text-white mt-1">
                      ~58.2 $DCLD
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ValidatorCard