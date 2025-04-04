import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, PieChart, Wallet, Repeat, Rocket, Banknote, Zap, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../layouts/SectionWrapper';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const RevenueModel = () => {
  const models = [
    {
      title: "Crypto Staking",
      icon: <Coins className="h-8 w-8" />,
      description: "Secure network through token staking",
      color: "from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-800"
    },
    {
      title: "Validator Yield",
      icon: <PieChart className="h-8 w-8" />,
      description: "Earn from validation activities",
      color: "from-purple-500 to-purple-300 dark:from-purple-600 dark:to-purple-800"
    },
    {
      title: "Pay-per-Check",
      icon: <Wallet className="h-8 w-8" />,
      description: "Flexible transaction-based model",
      color: "from-green-500 to-green-300 dark:from-green-600 dark:to-green-800"
    },
    {
      title: "Subscriptions",
      icon: <Repeat className="h-8 w-8" />,
      description: "Premium recurring plans",
      color: "from-orange-500 to-orange-300 dark:from-orange-600 dark:to-orange-800"
    },
    {
      title: "Network Fees",
      icon: <Banknote className="h-8 w-8" />,
      description: "Sustainable protocol funding",
      color: "from-red-500 to-red-300 dark:from-red-600 dark:to-red-800"
    }
  ];

  const distribution = [
    { value: 85, label: "Validator Rewards", color: "bg-emerald-400" },
    { value: 12, label: "Protocol Growth", color: "bg-blue-400" },
    { value: 3, label: "Token Burn", color: "bg-purple-400" }
  ];

  return (
    <SectionWrapper className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 relative"
        >
          <div className="absolute inset-x-0 top-1/2 -z-10 flex justify-center opacity-15">
            <div className="w-[800px] h-[200px] bg-gradient-to-r from-blue-600 to-emerald-600 blur-[100px] rounded-full animate-pulse" />
          </div>

          <Badge
            variant="outline"
            className="text-sm py-1 px-4 rounded-full border-blue-500/50 bg-background/80 backdrop-blur-sm"
          >
            Economic Model
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Sustainable Token Economy
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A balanced ecosystem designed for long-term growth and stability through decentralized verification
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 dark:opacity-5 dark:group-hover:opacity-15 ${model.color}" />

                <CardHeader className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`bg-gradient-to-br ${model.color} w-fit p-3 rounded-lg mb-4`}
                  >
                    {model.icon}
                  </motion.div>
                  <CardTitle className="text-2xl">{model.title}</CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>

                <ChevronRight className="absolute bottom-4 right-4 h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold">Economic Distribution</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent allocation of network resources and rewards ensuring fair participation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {distribution.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="space-y-6 text-center"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground/20"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                    />
                    <motion.circle
                      className={item.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                      initial={{ strokeDasharray: '0 283' }}
                      animate={{ strokeDasharray: `${283 * (item.value / 100)} 283` }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {item.value}%
                    </span>
                  </div>
                </div>
                <div className="text-lg font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </SectionWrapper>
  );
};

export default RevenueModel;