import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Trash2, Pause, RefreshCw, ExternalLink, Settings } from 'lucide-react';
import { Website } from '@/config/types';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WebsiteCardProps {
  website: Website;
}

export const WebsiteCard = ({ website }: WebsiteCardProps) => {
  const siteTicks = Array(10).fill('up').map((_, i) => ({
    status: i % 8 === 0 ? 'down' : 'up', 
    timestamp: Date.now() - (i * 15 * 60 * 1000) 
  }));

  return (
    <Card className="w-full hover:shadow-md transition-shadow group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-start gap-3">
            <div className="relative mt-1">
              <div className={`h-3 w-3 rounded-full ${website.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}>
                <div className="absolute inset-0 animate-ping bg-current opacity-25 rounded-full" />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold tracking-tight">
                {website.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline truncate max-w-[240px]"
                >
                  {website.url.replace(/^https?:\/\//, '')}
                </a>
                {/* <span className="text-xs text-muted-foreground">
                  · Checked {formatDistanceToNow(website.lastChecked, { addSuffix: true })}
                </span> */}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                {website.isPaused ? (
                  <><RefreshCw className="h-4 w-4" /> Resume</>
                ) : (
                  <><Pause className="h-4 w-4" /> Pause</>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Uptime (24h)</span>
              <span>{website.uptime}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${website.uptime}%` }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Avg. Response</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">{website.responseTime}</span>
              <span className="text-sm text-muted-foreground">ms</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Last Incident</p>
            <p className="text-sm font-medium">
              {website.lastDowntime ?
                formatDistanceToNow(website.lastDowntime, { addSuffix: true }) :
                'No incidents'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Downtime (30d)</p>
            <p className="text-sm font-medium">{website.downtimeDuration || '0m'}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Recent Checks</p>
          <div className="flex flex-wrap gap-1">
            {siteTicks.map((tick, index) => (

              <TooltipProvider>
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <div className={`h-3 w-3 rounded-sm ${tick.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tick.status === 'up' ? 'Operational' : 'Downtime'}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatDistanceToNow(tick.timestamp, { addSuffix: true })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Monitoring every {website.monitoringInterval} minutes
          </span>
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <ExternalLink className="h-4 w-4" />
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};