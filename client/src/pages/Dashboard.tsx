import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { sampleAlerts } from "@/data/sampleData";
import { WebsiteCard } from "@/components/Dashboard/websiteCard";
import { AlertsPanel } from "@/components/Dashboard/AlertPanel";
import { AddWebsiteDialog } from "@/components/Dashboard/AddWebsite";
import { PerformanceCharts } from "@/components/Dashboard/PerformanceChart";
import { Button } from "@/components/ui/button";
import { getWebsites } from "@/service/webService";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const tempWebsites = [
  { _id: "1", url: "https://example.com", status: "Up", latency: 120 },
  { _id: "2", url: "https://testsite.com", status: "Down", latency: -1 },
  { _id: "3", url: "https://sample.io", status: "Up", latency: 200 },
];

const UptimeChainDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [websites, setWebsites] = useState<{ _id: string; url: string; status: string; latency: number }[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        if (isAuthenticated && user?.email) {
          setLoadingData(true);
          const response = await getWebsites(user.email);
          setWebsites(response?.length > 0 ? response : tempWebsites);
        }
      } catch (err) {
        console.error("Error fetching websites:", err);
        setWebsites(tempWebsites);
      } finally {
        setLoadingData(false);
      }
    };
    fetchWebsites();
  }, [isAuthenticated, user?.email]);
  useEffect(() => {
    socket.on("tick_update", (data) => {
      console.log("🔄 Real-time update received:", data);
    });

    return () => {
      socket.off("tick_update");
    };
  }, []);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        <main className="container mx-auto py-6 px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Website Monitoring Dashboard</h2>
              <p className="text-muted-foreground">
                Monitor your websites' uptime and performance
              </p>
            </div>
            <div className="flex gap-2">
              <AddWebsiteDialog />
              <Button variant="outline">Export Report</Button>
              <Button
                variant="outline"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {loadingData ? (

              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-200 animate-pulse"></div>
              ))
            ) : error ? (

              <div className="col-span-full text-red-500 text-center">{error}</div>
            ) : (

              websites.map((website) => (
                <WebsiteCard key={website._id} website={website} />
              ))
            )}
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