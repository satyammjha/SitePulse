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

const UptimeChainDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [websites, setWebsites] = useState<
    { _id: string; url: string; status: string; latency: number }[]
  >([]);
  const [loadingData, setLoadingData] = useState(true);
  const [alerts, setAlerts] = useState<{ id: string; websiteName: string; message: string; timestamp: string; type: string; resolved: boolean }[]>([]);

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
        console.log("Fetching error logs for websites:", websites);
        if (websites.length > 0 && user?.email) {
          console.log("Fetching error logs for user:", user.email);
          const errorLogs = await fetchDownTimeLogs(user.email);
          setAlerts(errorLogs || []);
        }
      } catch (error) {
        console.error("Error fetching error logs:", error);
      }
    };

    getErrorLogs();
  }, [websites, user?.email]);

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
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Chart placeholder</span>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-xl border">
                  <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
                  <AlertsPanel alerts={alerts} />
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