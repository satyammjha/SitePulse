import { Coins, PieChart, Wallet, Repeat, Rocket, Banknote, Zap, Sparkles, PieChartIcon, WalletIcon } from 'lucide-react';
import { motion, useTransform } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Button } from '@/components/ui/button';

const RevenueModel = () => {
  return (
    <SectionWrapper className="relative overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute right-1/4 bottom-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Economic Ecosystem
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A self-sustaining financial engine powering decentralized verification
          </p>
        </motion.div>
        <div className="relative h-[800px] w-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
              initial={{
                scale: 0,
                x: Math.random() * 100 - 50 + '%',
                y: Math.random() * 100 - 50 + '%'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-slate-200/30 dark:border-slate-700/50"
            >
              {['+8%', '+12%', '+15%'].map((text, i) => (
                <motion.div
                  key={text}
                  className="absolute text-green-500 font-bold text-lg"
                  style={{
                    left: `${Math.cos((i * 120 * Math.PI) / 180) * 280 + 280}px`,
                    top: `${Math.sin((i * 120 * Math.PI) / 180) * 280 + 280}px`
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="w-[500px] h-[500px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <svg className="absolute inset-0 w-full h-full">
                {[0, 120, 240].map((angle) => (
                  <path
                    key={angle}
                    d={`M 250,250 L ${250 + Math.cos((angle * Math.PI) / 180) * 200},${250 + Math.sin((angle * Math.PI) / 180) * 200}`}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 6"
                  />
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-[400px] h-[400px] rounded-full"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ transformOrigin: `200px 200px` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 group"
                      style={{ transformOrigin: `200px 200px` }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-100 dark:border-slate-700 hover:scale-125 transition-transform relative">
                        {i === 1 && <Coins className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                        {i === 2 && <PieChartIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                        {i === 3 && <WalletIcon className="h-8 w-8 text-green-600 dark:text-green-400" />}
                        {i === 4 && <Banknote className="h-8 w-8 text-orange-600 dark:text-orange-400" />}
                        {i === 5 && <Banknote className="h-8 w-8 text-red-600 dark:text-red-400" />}

                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {['Staking', 'Yield', 'Payments', 'Subscriptions', 'Fees'][i - 1]}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center shadow-2xl"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 animate-pulse" />

                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                />

                <Rocket className="h-20 w-20 text-white animate-float" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-2 border-dashed border-white/10"
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-white/50"
                      style={{ transform: `rotate(${i * 60}deg)` }}
                    >
                      •
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-32">
          {[
            {
              title: "Crypto Staking",
              icon: Coins,
              color: "from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-950/20",
              description: "Secure network through token staking"
            },
            {
              title: "Validator Yield",
              icon: PieChartIcon,
              color: "from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-950/20",
              description: "Earn from validation activities"
            },
            {
              title: "Pay-per-Check",
              icon: Wallet,
              color: "from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-950/20",
              description: "Flexible transaction-based model"
            },
            {
              title: "Subscriptions",
              icon: Repeat,
              color: "from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-950/20",
              description: "Premium recurring plans"
            },
            {
              title: "Network Fees",
              icon: Banknote,
              color: "from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-950/20",
              description: "Sustainable protocol funding"
            }
          ].map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-b ${model.color} border border-slate-200/50 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <model.icon className="h-12 w-12 mb-6 text-slate-900 dark:text-white" />
              <h3 className="text-2xl font-semibold mb-4">{model.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{model.description}</p>
              <div className="mt-6 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
          <div className="max-w-4xl mx-auto relative">
            <Sparkles className="h-24 w-24 text-white/10 absolute -top-8 -left-8 animate-pulse" />
            <Sparkles className="h-24 w-24 text-white/10 absolute -bottom-8 -right-8 animate-pulse delay-1000" />

            <h3 className="text-4xl font-bold mb-6">Economic Distribution</h3>
            <p className="text-xl mb-8 opacity-90">
              Transparent allocation of network resources and rewards
            </p>

            <div className="grid grid-cols-3 gap-12">
              {[
                { value: '85%', label: 'Validator Rewards', color: 'bg-green-400' },
                { value: '12%', label: 'Protocol Growth', color: 'bg-blue-400' },
                { value: '3%', label: 'Token Burn', color: 'bg-purple-400' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className={`h-3 rounded-full ${item.color} animate-glow`} />
                  <div className="text-5xl font-bold">{item.value}</div>
                  <div className="text-sm uppercase tracking-wide opacity-80">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default RevenueModel;