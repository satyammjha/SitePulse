export type Website = {
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
  
  export type Alert = {
    id: string;
    websiteId: string;
    websiteName: string;
    type: 'downtime' | 'ssl' | 'performance';
    message: string;
    timestamp: string;
    resolved: boolean;
  };