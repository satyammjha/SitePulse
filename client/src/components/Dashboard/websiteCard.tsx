import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Trash2, Pause, RefreshCw, ExternalLink, Settings } from 'lucide-react';
import { Website } from '@/config/types';

interface WebsiteCardProps {
  website: Website;
}

export const WebsiteCard = ({ website }: WebsiteCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              {website.status === 'up' ? 
                <span className="mr-2 text-2xl">🟢</span> : 
                <span className="mr-2 text-2xl">🔴</span>}
              {website.name}
            </CardTitle>
            <CardDescription className="text-xs truncate mt-1">{website.url}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                {website.isPaused ? 
                  <><RefreshCw className="mr-2 h-4 w-4" /> Resume</> : 
                  <><Pause className="mr-2 h-4 w-4" /> Pause</>
                }
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center text-red-500">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-2xl font-semibold">{website.uptime}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response</p>
            <p className="text-2xl font-semibold">{website.responseTime}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Downtime</p>
            <p className="text-sm">
              {website.lastDowntime ? 
                new Date(website.lastDowntime).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 
                'Never'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-sm">{website.downtimeDuration || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Checks every {website.monitoringInterval} min
          </span>
          <Button variant="outline" size="sm" className="h-8">
            <ExternalLink className="h-3 w-3 mr-1" /> View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};