import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: Date;
  responseTime: number;
}

interface PerformanceChartsProps {
  data: ChartData[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const PerformanceCharts = ({ 
  data, 
  selectedPeriod, 
  onPeriodChange 
}: PerformanceChartsProps) => {
  return (
    <div className="w-full">
      {/* <CardHeader>
        <div className="flex justify-between items-center">
      
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30m">30 minutes</SelectItem>
              <SelectItem value="24h">24 hours</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader> */}
      <CardContent className="pb-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickFormatter={(time) => 
                  new Date(time).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                }
              />
              {/* <YAxis
                stroke="hsl(var(--foreground))"
                fontSize={12}
                unit="ms"
                width={60}
              /> */}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelFormatter={(label) => 
                  new Date(label).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                }
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
    </div>
  );
};