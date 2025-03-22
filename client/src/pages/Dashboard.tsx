import React, { useState } from 'react';
import { Bell, Plus, Moon, Sun, Settings, RefreshCw, Pause, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


type Website = {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  uptime: number;
  responseTime: number;
  lastDowntime: string | null;
  downtimeDuration: string | null;
  monitoringInterval: number;
  isPaused: boolean;
};

type Alert = {
  id: string;
  websiteId: string;
  websiteName: string;
  type: 'downtime' | 'ssl' | 'performance';
  message: string;
  timestamp: string;
  resolved: boolean;
};

const sampleWebsites: Website[] = [
  {
    id: '1',
    name: 'Main Website',
    url: 'https://example.com',
    status: 'up',
    uptime: 99.98,
    responseTime: 120,
    lastDowntime: '2025-03-15T14:30:00',
    downtimeDuration: '5 mins',
    monitoringInterval: 5,
    isPaused: false
  },
  {
    id: '2',
    name: 'API Endpoint',
    url: 'https://api.example.com',
    status: 'up',
    uptime: 99.95,
    responseTime: 86,
    lastDowntime: '2025-03-18T09:15:00',
    downtimeDuration: '3 mins',
    monitoringInterval: 1,
    isPaused: false
  },
  {
    id: '3',
    name: 'Customer Portal',
    url: 'https://portal.example.com',
    status: 'down',
    uptime: 98.76,
    responseTime: 250,
    lastDowntime: '2025-03-22T08:45:00',
    downtimeDuration: '15 mins',
    monitoringInterval: 3,
    isPaused: false
  }
];

const sampleAlerts: Alert[] = [
  {
    id: 'a1',
    websiteId: '3',
    websiteName: 'Customer Portal',
    type: 'downtime',
    message: 'Website is down - HTTP 503',
    timestamp: '2025-03-22T08:45:00',
    resolved: false
  },
  {
    id: 'a2',
    websiteId: '1',
    websiteName: 'Main Website',
    type: 'ssl',
    message: 'SSL Certificate expires in 10 days',
    timestamp: '2025-03-21T11:20:00',
    resolved: false
  },
  {
    id: 'a3',
    websiteId: '2',
    websiteName: 'API Endpoint',
    type: 'performance',
    message: 'Slow response time (>200ms)',
    timestamp: '2025-03-20T15:45:00',
    resolved: true
  }
];

const WebsiteCard = ({ website }: { website: Website }) => {
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

const AlertsPanel = ({ alerts }: { alerts: Alert[] }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Alerts</CardTitle>
          <Button size="sm" variant="outline">
            Configure Alerts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  alert.type === 'downtime' ? 'bg-red-500' : 
                  alert.type === 'ssl' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium">{alert.websiteName}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <time className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </time>
                </div>
              </div>
              <Badge variant={alert.resolved ? "outline" : "destructive"}>
                {alert.resolved ? "Resolved" : "Active"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Alerts</Button>
      </CardFooter>
    </Card>
  );
};

const AddWebsiteDialog = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Website</DialogTitle>
          <DialogDescription>
            Enter the details of the website you want to monitor
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" placeholder="My Website" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">URL</Label>
            <Input id="url" placeholder="https://example.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interval" className="text-right">Interval</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Every 1 minute</SelectItem>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
                <SelectItem value="60">Every hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Alerts</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="webhook" />
                <Label htmlFor="webhook">Webhook</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Website</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PerformanceCharts = () => {
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
        <div className="h-64 bg-muted rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Response time chart would be rendered here</p>
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

const UptimeChainDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">


        <main className="container mx-auto py-6 px-4 md:px-6">
       
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Website Monitoring Dashboard</h2>
              <p className="text-muted-foreground">Monitor your websites' uptime and performance</p>
            </div>
            <div className="flex gap-2">
              <AddWebsiteDialog />
              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {sampleWebsites.map(website => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PerformanceCharts />
            </div>
            <div>
              <AlertsPanel alerts={sampleAlerts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UptimeChainDashboard;