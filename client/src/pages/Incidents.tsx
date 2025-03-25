import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, AlertCircle } from "lucide-react";

interface Incident {
    id: string;
    website: string;
    status: "resolved" | "investigating" | "outage";
    duration: string;
    timestamp: string;
    description: string;
}

// Hardcoded incident data
const incidents: Incident[] = [
    {
        id: "1",
        website: "example.com",
        status: "outage",
        duration: "42m",
        timestamp: "2024-03-20 14:30",
        description: "Server timeout errors across multiple regions"
    },
    {
        id: "2",
        website: "demo.app",
        status: "investigating",
        duration: "1h 15m",
        timestamp: "2024-03-20 13:45",
        description: "API response delays affecting checkout flow"
    },
    {
        id: "3",
        website: "shop.com",
        status: "resolved",
        duration: "24m",
        timestamp: "2024-03-20 11:20",
        description: "CDN configuration issues causing asset loading failures"
    }
];

const statusColors = {
    outage: "bg-red-500",
    investigating: "bg-amber-500",
    resolved: "bg-green-500"
};

const Incidents = () => {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Incident History</h1>
                        <p className="text-muted-foreground mt-2">Historical record of system incidents</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Resolution</CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">38m</div>
                            <p className="text-xs text-muted-foreground mt-1">Global average</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                            <Badge variant="outline" className="bg-green-500/20 text-green-500">All Systems Operational</Badge>
                        </CardHeader>
                    </Card>
                </div>

                <Card>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
                        <div className="space-y-1">
                            <h3 className="font-semibold">Recent Incidents</h3>
                            <p className="text-sm text-muted-foreground">System-wide incident log</p>
                        </div>

                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <Input
                                placeholder="Search incidents..."
                                className="max-w-sm"
                            />
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="investigating">Investigating</SelectItem>
                                    <SelectItem value="outage">Outage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="border-t">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium">Website</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium">Duration</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {incidents.map((incident) => (
                                        <tr key={incident.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant="outline"
                                                    className={`${statusColors[incident.status]} text-foreground`}
                                                >
                                                    {incident.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{incident.website}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground max-w-[300px]">
                                                {incident.description}
                                            </td>
                                            <td className="px-6 py-4">{incident.duration}</td>
                                            <td className="px-6 py-4">{incident.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Incidents;