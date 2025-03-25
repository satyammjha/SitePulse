import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Activity,
  AlertCircle,
  Clock,
  ExternalLink,
  Settings,
  Timer,
  Gauge,
  History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { io } from "socket.io-client";

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
  const [ticks, setTicks] = useState<{ time: string; status: string; latency: number }[]>([]);

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
            time: new Date().toLocaleTimeString(),
            status: websiteUpdate.status,
            latency: websiteUpdate.latency
          },
          ...prev.slice(0, 9)
        ]);
      }
    };

    socket.on("tick_update", handleStatusUpdate);
    return () => {
      socket.off("tick_update", handleStatusUpdate);
      socket.disconnect();
    };
  }, [website.id]);

  const statusColor = siteStatus === 'Up' ? 'bg-green-400' : 'bg-red-400';
  const latencyStatus = siteLatency < 300 ? 'bg-green-400' :
    siteLatency < 600 ? 'bg-amber-400' : 'bg-red-400';
  const avgLatency = ticks.length > 0
    ? (ticks.reduce((sum, tick) => sum + tick.latency, 0) / ticks.length)
    : 0;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow group relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg font-semibold">
                {website.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline truncate max-w-[200px]"
                >
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
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Site
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Status Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={`w-3 h-3 p-0 rounded-full ${statusColor}`} />
              <span className="text-sm font-medium">Current Status</span>
            </div>
            <div className={`text-2xl font-bold ${siteStatus === 'Up' ? 'text-green-600' : 'text-red-600'}`}>
              {siteStatus || 'N/A'}
            </div>
          </div>

          {/* Latency Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{siteLatency || 'N/A'}</span>
              <span className="text-muted-foreground">ms</span>
              <div className={`w-2 h-2 rounded-full ${latencyStatus}`} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Uptime Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Uptime (24h)</span>
            <Progress value={website.uptime} className="h-2 w-full" />
            <span className="font-semibold text-primary">{website.uptime}%</span>
          </div>
        </div>

        {/* Incident History */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Last Incident</span>
            <span className="font-semibold">
              {website.lastDowntime || 'No incidents recorded'}
            </span>
          </div>
        </div>

        <Separator />

        {/* Recent Checks */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <History className="h-4 w-4 text-muted-foreground" />
            Recent Checks
            <Badge variant="outline" className="px-2 py-0">
              {ticks.length} records
            </Badge>
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-1">
              {ticks.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                  No checks available
                </span>
              ) : (
                ticks.map((tick, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div className={`h-3 w-3 rounded-sm ${tick.status === 'Up' ? 'bg-green-400' : 'bg-red-400'}`} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tick.status === 'Up' ? 'bg-green-400' : 'bg-red-400'}`} />
                          <span className="font-medium">{tick.status}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tick.time}
                        </div>
                        <div className="text-xs">
                          Latency: {tick.latency}ms
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex items-center gap-2">
        <Timer className="h-4 w-4" />
        <span>Automatic checks every {website.monitoringInterval} minutes</span>
      </CardFooter>
    </Card>
  );
};