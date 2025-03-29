import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, Website } from "@/config/types";
import { AlertTriangle, ShieldAlert, Globe, Link2, Timer, Clock, Gauge } from "lucide-react";

interface AlertsPanelProps {
  alerts: Alert[];
  websites: Website[];
}

export const AlertsPanel = ({ alerts, websites }: AlertsPanelProps) => {
  const formatInterval = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <Card className="w-full shadow-sm border-border">
      <CardHeader className="pb-3 bg-muted/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
          <Button size="sm" variant="outline">
            Configure Alerts
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {alerts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            No recent alerts
          </p>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert, index) => {
              const website = websites.find(w => w.id === alert.websiteId);

              return (
                <div
                  key={alert.id || index}
                  className="flex items-center justify-between p-3 rounded-md transition-colors bg-muted/30 hover:bg-muted/50"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {alert.type === "downtime" ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : alert.type === "ssl" ? (
                        <ShieldAlert className="h-5 w-5 text-warning" />
                      ) : (
                        <Globe className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {website?.url.replace(/^https?:\/\//, '') || "Unknown Website"}
                        </p>
                        <Badge
                          variant={alert.resolved ? "outline" : "destructive"}
                          className="h-5 text-xs"
                        >
                          {alert.resolved ? "Resolved" : "Active"}
                        </Badge>
                      </div>

                      {alert.errorMessage ? (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          {alert.errorMessage}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {alert.message || "No additional details provided"}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Gauge className="h-4 w-4" />
                          {alert.latency >= 0 ? (
                            <span>{alert.latency}ms latency</span>
                          ) : (
                            <span>Timeout detected</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {alert.checkedAt && new Date(alert.checkedAt).toLocaleString()}
                        </div>

                        {website?.interval && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Timer className="h-4 w-4" />
                            Monitoring every {formatInterval(website.interval)}
                          </div>
                        )}

                        {website?.lastCheck && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Last checked: {new Date(website.lastCheck).toLocaleTimeString()}
                          </div>
                        )}

                        {alert.resolvedAt && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <AlertTriangle className="h-4 w-4" />
                            Resolved: {new Date(alert.resolvedAt).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {website?.url && (
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-2 text-primary text-sm hover:underline"
                        >
                          <Link2 className="h-4 w-4 mr-1.5" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};