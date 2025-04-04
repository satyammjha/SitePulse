import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { WebsiteCard } from "@/components/Dashboard/websiteCard";
import { AlertsPanel } from "@/components/Dashboard/AlertPanel";
import { AddWebsiteDialog } from "@/components/Dashboard/AddWebsite";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWebsites } from "@/service/webService";
import { RocketIcon, DownloadIcon } from "@radix-ui/react-icons";
import { fetchDownTimeLogs } from "@/service/getErrorLogs";
import { ActivityIcon, AlertCircleIcon, GaugeIcon } from "lucide-react";

const UptimeChainDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [websites, setWebsites] = useState<
    { _id: string; url: string; status: string; latency: number }[]
  >([]);
  const [loadingData, setLoadingData] = useState(true);
  const [alerts, setAlerts] = useState<{
    id: string;
    websiteName: string;
    message: string;
    timestamp: string;
    type: string;
    resolved: boolean
  }[]>([]);
  const [metrics, setMetrics] = useState({
    uptime: 0,
    latency: 0,
    outages: 0
  });

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        if (isAuthenticated && user?.email) {
          setLoadingData(true);
          const response = await getWebsites(user.email);
          setWebsites(response);
        }
      } catch (err) {
        console.error("Error fetching websites:", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchWebsites();
  }, [isAuthenticated, user?.email]);

  useEffect(() => {
    const getErrorLogs = async () => {
      try {
        if (websites.length > 0 && user?.email) {
          const errorLogs = await fetchDownTimeLogs(user.email);
          setAlerts(errorLogs || []);
        }
      } catch (error) {
        console.error("Error fetching error logs:", error);
      }
    };
    getErrorLogs();
  }, [websites, user?.email]);

  useEffect(() => {
    if (websites.length > 0) {
      const activeWebsites = websites.filter(w => w.status === 'active').length;
      const uptime = (activeWebsites / websites.length) * 100;
      const totalLatency = websites.reduce((sum, w) => sum + w.latency, 0);
      const avgLatency = totalLatency / websites.length;
      const outages = alerts.filter(a => !a.resolved).length;

      setMetrics({
        uptime: Number(uptime.toFixed(1)),
        latency: Number(avgLatency.toFixed(1)),
        outages
      });
    }
  }, [websites, alerts]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl px-4">
          <div className="grid grid-cols-auto-fit-300 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <AddWebsiteDialog />
            <Button variant="outline" className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          {websites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4 border rounded-xl bg-background">
              <RocketIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No websites monitored</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first website
              </p>
              <AddWebsiteDialog />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-auto-fit-300 gap-6">
                {websites.map((website) => (
                  <WebsiteCard
                    key={website._id}
                    website={website}
                    className="hover:shadow-lg transition-shadow min-w-0"
                  />
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="bg-background p-6 rounded-xl border">
                  <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                        <ActivityIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{metrics.uptime}%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                        <GaugeIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{metrics.latency}ms</div>
                        <div className="text-sm text-muted-foreground">Avg Latency</div>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                        <AlertCircleIcon className="h-6 w-6 text-red-600 dark:text-red-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{metrics.outages}</div>
                        <div className="text-sm text-muted-foreground">Active Outages</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Response Time Chart (Last 24hrs)</span>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-xl border">
                  <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
                  <AlertsPanel alerts={alerts} websites={websites} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UptimeChainDashboard;