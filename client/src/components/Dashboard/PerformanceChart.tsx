import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getWebsiteTicks } from '@/service/getTicks';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  responseTime: number;
}

interface PerformanceChartsProps {
  selectedPeriod: string;
  id: string;
  url: string;
  onPeriodChange: (period: string) => void;
  realTimeData: ChartData[];
}

export const PerformanceCharts = ({
  selectedPeriod,
  id,
  realTimeData,
}: PerformanceChartsProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    if (selectedPeriod === '1h') {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const filteredData = realTimeData.filter(tick => 
        new Date(tick.time) >= oneHourAgo
      );
      setChartData(filteredData);
    }
  }, [realTimeData, selectedPeriod]);

  useEffect(() => {
    if (selectedPeriod !== '1h') {
      const fetchHistoricalData = async () => {
        try {
          const response = await getWebsiteTicks(id);
          const allData = response.data.map((tick: any) => ({
            time: new Date(tick.checkedAt).toISOString(),
            responseTime: tick.latency,
          }));

          const now = new Date();
          const filteredData = allData.filter((tick: { time: string }) => {
            const tickTime = new Date(tick.time);
            switch (selectedPeriod) {
              case '24h':
                return now.getTime() - tickTime.getTime() <= 24 * 60 * 60 * 1000;
              case '7d':
                return now.getTime() - tickTime.getTime() <= 7 * 24 * 60 * 60 * 1000;
              default:
                return true;
            }
          });

          setChartData(filteredData);
        } catch (error) {
          console.error("Error fetching historical data:", error);
        }
      };
      fetchHistoricalData();
    }
  }, [selectedPeriod, id]);
  return (
    <div className="w-full">
      <CardContent className="pb-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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