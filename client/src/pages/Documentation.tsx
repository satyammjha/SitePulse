import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const features = [
    {
        title: "Global Validation Network",
        icon: "globe",
        description: "58 Countries | 420+ Active Nodes | 24.7M Daily Checks"
    },
    {
        title: "Blockchain Security",
        icon: "shield",
        description: "Immutable uptime records stored on decentralized ledger"
    },
    {
        title: "Instant Alerts",
        icon: "alert-octagon",
        description: "Real-time notifications via email, SMS, and webhooks"
    },
    {
        title: "24/7 Monitoring",
        icon: "activity",
        description: "Round-the-clock surveillance with automatic failover checks"
    },
    {
        title: "API Access",
        icon: "terminal",
        description: "REST API integration with detailed documentation"
    },
    {
        title: "Validation Rewards",
        icon: "coins",
        description: "8-12% APY through decentralized validation participation"
    }
];

export default function Documentation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-14 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px]">
                                <nav className="flex flex-col gap-2 pt-6">
                                    {features.map((feature) => (
                                        <Button key={feature.title} variant="ghost" className="justify-start">
                                            {feature.title}
                                        </Button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                       
                    </div>

                </div>
            </header>

            <div className="container flex gap-6 pt-6">
                {/* Desktop Sidebar */}
                <nav className="hidden w-[200px] flex-col gap-2 md:flex">
                    {features.map((feature) => (
                        <Button key={feature.title} variant="ghost" className="justify-start">
                            {feature.title}
                        </Button>
                    ))}
                </nav>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="bg-transparent">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                     
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}