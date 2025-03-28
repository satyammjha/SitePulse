import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/config/types";

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Alerts</CardTitle>
          <Button size="sm" variant="outline">Configure Alerts</Button>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No recent alerts</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={alert.id || index} className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      alert.type === "downtime"
                        ? "bg-red-500"
                        : alert.type === "ssl"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{alert.websiteName || "Unknown Website"}</p>
                    <p className="text-sm text-muted-foreground">{alert.message || "No details available"}</p>
                    <time className="text-xs text-muted-foreground">
                      {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : "Unknown Time"}
                    </time>
                  </div>
                </div>
                <Badge variant={alert.resolved ? "outline" : "destructive"}>
                  {alert.resolved ? "Resolved" : "Active"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Alerts</Button>
      </CardFooter>
    </Card>
  );
};