import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Server, Satellite } from 'lucide-react'

const NetworkMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="mt-20 relative isolate"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 animate-rotate opacity-50" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-15 dark:opacity-[0.03]" />
      </div>

      <div className="relative rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700 bg-gradient-to-br from-white/60 to-slate-50/60 dark:from-slate-900/70 dark:to-slate-800/50 p-8 shadow-2xl backdrop-blur-xl">
     
        <div className="absolute inset-0 flex items-center justify-center">
       
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos(angle) * 45}%`}
                  y2={`${50 + Math.sin(angle) * 45}%`}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  className="text-blue-500 dark:text-blue-400"
                />
              )
            })}
          </svg>

          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                type: 'spring',
                damping: 4
              }}
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-30" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center py-14 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-slate-100/70 dark:bg-slate-800/50 px-6 py-2 rounded-full border border-slate-200/50 dark:border-slate-700"
          >
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin-slow" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Global Validation Network
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: Globe,
                value: '58',
                label: 'Countries',
                color: 'text-blue-600 dark:text-blue-400'
              },
              { 
                icon: Server,
                value: '420+',
                label: 'Active Nodes',
                color: 'text-purple-600 dark:text-purple-400'
              },
              { 
                icon: Zap,
                value: '24.7M',
                label: 'Daily Checks',
                color: 'text-green-600 dark:text-green-400'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="p-6 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <div className={`${stat.color} mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-opacity-20`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Satellite className="h-4 w-4 text-purple-500" />
              <span>99.99% Network Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>24/7 Monitoring</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NetworkMap