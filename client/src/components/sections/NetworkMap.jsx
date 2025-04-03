import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Server, Satellite } from 'lucide-react'

const NetworkMap = () => {
  const angles = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-24 isolate"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-15 dark:opacity-[0.02]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-[600px] h-[600px] rounded-full border opacity-10 dark:opacity-20 border-dashed border-foreground/10" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-square max-w-[600px] mx-auto">
          <svg className="absolute inset-0 w-full h-full">
            {angles.map((angle, i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + Math.cos(angle) * 45}%`}
                y2={`${50 + Math.sin(angle) * 45}%`}
                stroke="currentColor"
                strokeOpacity="0.05"
                className="text-foreground/20"
              />
            ))}
          </svg>

          {angles.map((angle, i) => {
            const endX = Math.cos(angle) * 45 + 50
            const endY = Math.sin(angle) * 45 + 50

            return (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
                initial={{
                  scale: 0,
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  scale: [0.8, 1, 0.8],
                  left: `${endX}%`,
                  top: `${endY}%`,
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            )
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Global Validation Network
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-xl bg-background/0 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all w-[10vw] sm:w-[300px]"
                >
                  <div className={`${stat.color} mb-3 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="flex flex-col items-center justify-center gap-y-1 text-center">
                    <div className="text-2xl font-bold tracking-tighter text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-green-500/20 text-green-600 dark:text-green-400">
                <Satellite className="h-4 w-4" />
                <span>99.99% Uptime</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-blue-500/20 text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>24/7 Monitoring</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NetworkMap