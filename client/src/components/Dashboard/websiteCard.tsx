import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
  TrashIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PerformanceCharts } from './PerformanceChart';
import { io } from "socket.io-client";
import { deleteWebsite } from '@/service/webService';
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
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const socket = io("http://localhost:5000");

    const handleStatusUpdate = (websiteUpdate: {
      websiteId: string;
      status: string;
      latency: number;
      checkedAt: string;
    }) => {
      setIsLoading(false);
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

  const statusColor = siteStatus === 'Up' ? 'bg-green-400/90' : 'bg-red-400';
  const latencyStatus = siteLatency < 300 ? 'bg-green-400' :
    siteLatency < 600 ? 'bg-amber-400' : 'bg-red-400';
  const chartData = ticks.map(tick => ({
    time: tick.time,
    responseTime: tick.latency,
  }));
  const [averageLatency, setAverageLatency] = useState(0);

  useEffect(() => {
    if (ticks.length > 0) {
      const total = ticks.reduce((sum, tick) => sum + tick.latency, 0);
      setAverageLatency(total / ticks.length);
    } else {
      setAverageLatency(0);
    }
  }, [ticks]);

  const deleteWebsiteHandler = async (id: string) => {
    try {
      if (user?.email) {
        deleteWebsite(user.email, website.id);
      } else {
        console.error("User email is undefined.");
      }
    }
    catch (
    error: any
    ) {
      console.log(error);
    }
  }


  return (
    <Card className="w-full hover:shadow-lg transition-shadow group relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`absolute -left-1 -top-1 h-3 w-3 rounded-full ${statusColor} animate-pulse`} />
              <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <Badge variant={siteStatus === 'Up' ? 'default' : 'destructive'}>
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white dark:text-black hover:text-primary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  {website.url.replace(/^https?:\/\//, '')}
                </a>
              </Badge>


            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Website settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2" onClick={() => deleteWebsiteHandler(website.id)}>
                <TrashIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <History className="h-4 w-4" />
                View History
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <HeartPulse className="h-4 w-4" />
                Health Reports
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Health Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 p-4 rounded-lg bg-muted/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`h-2 w-2 rounded-full ${statusColor}`} />
              Current Status
            </div>
            <div className={`text-3xl font-bold ${siteStatus === 'Up' ? 'text-green-600' : 'text-red-600'}`}>
              {isLoading ? <Skeleton className="h-8 w-20" /> : siteStatus}
            </div>
          </div>

          <div className="space-y-1 p-4 rounded-lg bg-muted/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="h-4 w-4" />
              Average Latency
            </div>
            <div className="flex items-baseline gap-2">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <span className="text-3xl font-bold">
                    {averageLatency.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">ms</span>
                  <div className={`w-3 h-3 rounded-full ${latencyStatus}`} />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recent Checks
          </h3>
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {isLoading ? (
              Array(24).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))
            ) : ticks.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No checks recorded
              </div>
            ) : (
              ticks.map((tick, index) => (
                <TooltipProvider>
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div
                        className={`h-4 w-4 rounded-full ${tick.status === 'Up'
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
              ))
            )}
          </div>
        </div>
        {/* Supplemental Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="space-y-2 p-4 rounded-lg bg-muted/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Uptime (24h)
            </div>
            <div className="flex items-center gap-3">
              <Progress value={website.uptime} className="h-2 flex-1" />
              <span className="font-semibold text-primary">{website.uptime}%</span>
            </div>
          </div> */}

          <div className="space-y-2 p-4 rounded-lg bg-muted/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Last Incident
            </div>
            <div className="font-medium">
              {website.lastDowntime || 'No incidents'}
            </div>
          </div>
        </div>

        {/* Performance Visualization */}
        <div className="space-y-4">
          {/* <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              Performance History
            </h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-background border rounded-md px-3 py-1 text-sm"
            >
              <option value="1h">1 hour</option>
              <option value="24h">24 hours</option>
              <option value="7d">7 days</option>
            </select>
          </div> */}
          <div className="h-64 w-full">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-md" />
            ) : (
              <PerformanceCharts
                data={chartData}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            )}
          </div>
        </div>

        {/* Activity Timeline */}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex items-center gap-2 border-t pt-4">
        <Timer className="h-4 w-4" />
        <span>
          Automatic health checks every {website.monitoringInterval} minutes
          {ticks.length > 0 && ` • Last check ${ticks[0].time.toLocaleTimeString()}`}
        </span>
      </CardFooter>
    </Card>
  );
};