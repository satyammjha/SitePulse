import { ChevronRight, Globe, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SectionWrapper from '../layouts/SectionWrapper'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <SectionWrapper className="relative py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center lg:justify-start"
            >
              <Badge 
                variant="outline" 
                className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-accent/50"
              >
                <Zap className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Blockchain-Powered Monitoring</span>
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Never Miss Downtime with{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Real-Time Alerts
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto lg:mx-0"
            >
              Monitor your website's uptime across{' '}
              <span className="font-semibold text-foreground">50+ global locations</span> with 
              blockchain-verified status reports.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
            >
              <Button 
                size="lg"
                className="gap-2 px-8 text-md transition-all hover:shadow-lg"
              >
                Start Free Trial
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-md border-border bg-background/50 hover:bg-accent/20"
              >
                Live Demo
              </Button>
            </motion.div>
          </div>

          <div className="relative lg:w-1/2 flex justify-center mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-2xl"
            >
              <Card className="rounded-xl overflow-hidden border-border shadow-xl">
                <img
                  src="/dashboard.png"
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
                
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="flex gap-3"
                  >
                    <Card className="p-4 backdrop-blur-sm bg-background/80 border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold">50+</p>
                          <p className="text-sm text-muted-foreground">Nodes</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="flex gap-3"
                  >
                    <Card className="p-4 backdrop-blur-sm bg-background/80 border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Zap className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold">24/7</p>
                          <p className="text-sm text-muted-foreground">Monitoring</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </Card>

              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}