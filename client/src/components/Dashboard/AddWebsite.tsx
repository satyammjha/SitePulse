import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import{ addWebsite} from "@/service/webService";
import { useAuth0 } from "@auth0/auth0-react";

export const AddWebsiteDialog = () => {
  const { isAuthenticated, user } = useAuth0();
  const email = isAuthenticated && user?.email ? user.email : "";
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState<number | null>(null);

  const addWebsiteTrigger = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to add a website.");
      return;
    }

    if (!url || !interval) {
      alert("Please provide a valid URL and interval.");
      return;
    }

    try {
      await addWebsite(url, email, interval);
      setOpen(false);
      setUrl("");
      setInterval(null);
    } catch (error: any) {
      console.error("Failed to add website:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addWebsiteTrigger();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Website</DialogTitle>
          <DialogDescription>
            Enter the details of the website you want to monitor
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                className="col-span-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interval" className="text-right">
                Interval
              </Label>
              <Select value={interval ? interval.toString() : ""} onValueChange={(value) => setInterval(Number(value))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="180000">Every 3 minutes</SelectItem>
                  <SelectItem value="300000">Every 5 minutes</SelectItem>
                  <SelectItem value="600000">Every 10 minutes</SelectItem>
                  <SelectItem value="900000">Every 15 minutes</SelectItem>
                  <SelectItem value="1800000">Every 30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Alerts</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="webhook" />
                  <Label htmlFor="webhook">Webhook</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Website</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};