import { useState } from 'react';
import { sampleWebsites, sampleAlerts } from '@/data/sampleData';
import { WebsiteCard } from '@/components/Dashboard/websiteCard';
import { AlertsPanel } from '@/components/Dashboard/AlertPanel';
import { AddWebsiteDialog } from '@/components/Dashboard/AddWebsite';
import { PerformanceCharts } from '@/components/Dashboard/PerformanceChart';
import { Button } from '@/components/ui/button';

const UptimeChainDashboard = () => {
  const [darkMode] = useState(false);

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