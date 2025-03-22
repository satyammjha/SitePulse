import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateSampleData = (period: string) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) { 
    data.push({
      time: new Date(now.getTime() - (24 - i) * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      responseTime: Math.floor(Math.random() * 300 + 50),
      uptime: Math.random() > 0.1 ? 100 : 0,
    });
  }
  
  return data;
};

const sampleData = generateSampleData('24h');

export const PerformanceCharts = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Performance Metrics</CardTitle>
                    <Select defaultValue="24h">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30m">30 min</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                            <SelectItem value="7d">7 days</SelectItem>
                            <SelectItem value="30d">30 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis 
                                dataKey="time" 
                                stroke="hsl(var(--foreground))" 
                                fontSize={12}
                                tickLine={{ stroke: 'hsl(var(--foreground))' }}
                            />
                            <YAxis 
                                stroke="hsl(var(--foreground))"
                                fontSize={12}
                                tickLine={{ stroke: 'hsl(var(--foreground))' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="responseTime" 
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter>
                <Tabs defaultValue="responsetime" className="w-full">
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="responsetime">Response Time</TabsTrigger>
                        <TabsTrigger value="uptime">Uptime</TabsTrigger>
                        <TabsTrigger value="downtime">Downtime</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardFooter>
        </Card>
    );
};