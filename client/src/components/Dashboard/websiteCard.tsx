import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Activity,
  AlertCircle,
  Clock,
  ExternalLink,
  Settings,
  Timer,
  Gauge,
  History,
  HeartPulse,
  Trash2,
  Trash2Icon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PerformanceCharts } from './PerformanceChart';
import { io } from "socket.io-client";
import { deleteWebsite } from '@/service/webService';
import { getWebsiteTicks } from '@/service/getTicks';
import { useAuth0 } from '@auth0/auth0-react';

interface Website {
  id: string;
  name: string;
  url: string;
  status: string;
  uptime: number;
  responseTime: number;
  lastDowntime: string | null;
  downtimeDuration: string;
  monitoringInterval: number;
}

interface WebsiteCardProps {
  website: Website;
}

export const WebsiteCard = ({ website }: WebsiteCardProps) => {
  const [siteStatus, setSiteStatus] = useState(website.status);
  const [siteLatency, setSiteLatency] = useState(website.responseTime);
  const [ticks, setTicks] = useState<{ time: Date; status: string; latency: number }[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d'>('1h');
  const [historicalData, setHistoricalData] = useState<{ time: Date; latency: number }[]>([]);
  const [averageLatency, setAverageLatency] = useState(0);
  const { user } = useAuth0();

  useEffect(() => {
    const socket = io("http://localhost:5000");
    const handleStatusUpdate = (websiteUpdate: {
      websiteId: string;
      status: string;
      latency: number;
      checkedAt: string;
    }) => {
      if (websiteUpdate.websiteId === website.id) {
        setSiteStatus(websiteUpdate.status);
        setSiteLatency(websiteUpdate.latency);
        setTicks(prev => [
          {
            time: new Date(websiteUpdate.checkedAt),
            status: websiteUpdate.status,
            latency: websiteUpdate.latency
          },
          ...prev.slice(0, 49)
        ]);
      }
    };
    socket.on("tick_update", handleStatusUpdate);
    return () => {
      socket.off("tick_update", handleStatusUpdate);
      socket.disconnect();
    };
  }, [website.id]);

  useEffect(() => {
    if (selectedPeriod === '24h' || selectedPeriod === '7d') {
      const fetchHistorical = async () => {
        try {
          const response = await getWebsiteTicks(website.id);
          const data = response.data.map((tick: any) => ({
            time: new Date(tick.checkedAt),
            latency: tick.latency
          }));
          const cutoff = selectedPeriod === '24h'
            ? Date.now() - 86400000
            : Date.now() - 604800000;
          setHistoricalData(data.filter((t: { time: { getTime: () => number; }; }) => t.time.getTime() > cutoff));
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      };
      fetchHistorical();
    }
  }, [selectedPeriod, website.id]);

  useEffect(() => {
    const calculateAverage = (data: { latency: number }[]) => {
      if (!data.length) return 0;
      return data.reduce((sum, tick) => sum + tick.latency, 0) / data.length;
    };

    if (selectedPeriod === '1h') {
      const oneHourAgo = Date.now() - 3600000;
      const recentTicks = ticks.filter(t => t.time.getTime() > oneHourAgo);
      setAverageLatency(calculateAverage(recentTicks));
    } else {
      setAverageLatency(calculateAverage(historicalData));
    }
  }, [ticks, historicalData, selectedPeriod]);

  const statusColor = siteStatus === 'Up' ? 'bg-green-400/90' : 'bg-red-400';
  const latencyStatusColor = averageLatency < 300 ? 'bg-green-400' :
    averageLatency < 600 ? 'bg-amber-400' : 'bg-red-400';

  const deleteWebsiteHandler = async (id: string) => {
    try {
      if (user?.email) await deleteWebsite(user.email, id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Card className="w-full max-w-4xl hover:shadow-lg transition-shadow relative h-full content-auto" >
      {selectedPeriod === '1h' && (
        <div className="absolute top-1 border-l-4 rounded-3xl -right-4 rotate-45 bg-green-400 text-white text-[10px] px-4 py-0.5 animate-pulse">
          LIVE
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`absolute -left-1 -top-1 h-3 w-3 rounded-full ${statusColor} animate-pulse`} />
              <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <Badge>
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white dark:text-black text-muted-foreground hover:text-primary hover:underline flex items-center gap-1.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  {website.url.replace(/^https?:\/\//, '')}
                </a>
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Website settings">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="gap-2 text-red-600"
                onClick={() => deleteWebsiteHandler(website.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete Monitor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-muted/5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <div className={`h-2 w-2 rounded-full ${statusColor}`} />
              Current Status
            </div>
            <div className={`text-2xl font-semibold ${siteStatus === 'Up' ? 'text-green-600' : 'text-red-600'}`}>
              {siteStatus}
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-muted/5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Gauge className="h-4 w-4" />
              {selectedPeriod === '1h' ? 'Live' : `${selectedPeriod}`} Avg. Latency
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">
                {averageLatency.toFixed(2)}
              </span>
              <span className="text-muted-foreground">ms</span>
              <div className={`w-3 h-3 rounded-full ${latencyStatusColor}`} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Performance History
              </h3>
              {selectedPeriod === '1h' && (
                <Badge variant="outline" className="border-green-400 text-green-400 animate-pulse">
                  Live
                </Badge>
              )}
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '1h' | '24h' | '7d')}
              className="bg-background border rounded-md px-3 py-1 text-sm"
            >
              <option value="1h">Live</option>
              <option value="24h">24 hours</option>
              <option value="7d">7 days</option>
            </select>
          </div>
          <div className="h-64 w-full border rounded-lg overflow-hidden">
            <PerformanceCharts
              selectedPeriod={selectedPeriod}
              id={website.id}
              url={website.url}
              realTimeData={ticks.map(t => ({
                time: t.time.toISOString(),
                responseTime: t.latency
              }))} onPeriodChange={function (period: string): void {
                throw new Error('Function not implemented.');
              }} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Recent Checks
            </h3>
            <span className="text-sm text-muted-foreground">
              {ticks.length} records
            </span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {ticks.map((tick, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`h-3 w-3 rounded-full ${tick.status === 'Up'
                        ? 'bg-green-400/90'
                        : 'bg-red-400/90'
                        }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="grid gap-1 text-sm">
                      <div className="font-medium">{tick.status}</div>
                      <div className="text-muted-foreground">
                        {tick.time.toLocaleTimeString()}
                      </div>
                      <div>Latency: {tick.latency}ms</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex items-center gap-2 border-t pt-4">
        <AlertCircle className="h-4 w-4" />
        <span>
          Last incident: {website.lastDowntime || 'No incidents recorded'} •
          Last check: {ticks[0]?.time.toLocaleTimeString() || 'N/A'}
        </span>
      </CardFooter>
    </Card>
  );
};