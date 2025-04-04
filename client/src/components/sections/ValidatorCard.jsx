import React from 'react'
import { motion } from 'framer-motion'
import { Coins, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const ValidatorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-16"
    >
      <Card className="relative overflow-hidden backdrop-blur-sm">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold flex items-center gap-2">
                  Become a Validator
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                </h3>
                <p className="text-muted-foreground">
                  Stake $DCLD to verify website status and earn rewards through decentralized validation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated APY</p>
                      <p className="text-xl font-semibold">8-12%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Stake</p>
                      <p className="text-xl font-semibold">500 $DCLD</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button size="lg" className="gap-2">
                    <Zap className="h-4 w-4" />
                    Join Waitlist
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">450+</span> validators registered
                  </p>
                </div>

                <div className="space-y-2">
                  <Progress value={55} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Early Access Progress</span>
                    <span>55% Filled</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="w-full lg:w-[400px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Stake</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    500 <span className="text-lg text-muted-foreground">$DCLD</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Zap className="h-4 w-4" />
                    +42.6 $DCLD earned (30d)
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Validation Accuracy</span>
                      <span>98.4%</span>
                    </div>
                    <Progress value={98.4} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Uptime Contribution</span>
                      <span>99.1%</span>
                    </div>
                    <Progress value={99.1} className="h-2" />
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Estimated monthly rewards:</p>
                    <p className="text-xl font-semibold mt-1">~58.2 $DCLD</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ValidatorCard;