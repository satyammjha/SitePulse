import { Website, Alert } from '@/config/types';

export const sampleWebsites: Website[] = [
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

export const sampleAlerts: Alert[] = [
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