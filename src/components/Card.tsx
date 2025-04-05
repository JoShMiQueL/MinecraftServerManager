import { cn } from "@/lib/utils";
import { Circle, Play, RefreshCw, Server, Square } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle, Card as _Card } from "./ui/card";

function ServiceState({
  className,
  state,
  ...props
}: React.ComponentPropsWithRef<"div"> & { state: string }) {
  const stateColorMap = {
    Running: "var(--color-green-500)",
    Stopped: "var(--color-red-500)",
    Restarting: "var(--color-yellow-500)",
    Stopping: "var(--color-orange-500)",
    Starting: "var(--color-blue-500)",
    "N/A": "var(--color-gray-500)",
  };
  const stateColor = stateColorMap[state as keyof typeof stateColorMap] || stateColorMap["N/A"];
  return (
    <div className={cn("flex items-center gap-2 mt-2 font-medium", className)} {...props}>
      <Circle className="size-3.5" color={stateColor} fill={stateColor} />
      {state}
    </div>
  );
}

function Card() {
  return (
    <_Card className="font-[Geist_Sans] rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
          <Server size={20} />
          API Server
        </CardTitle>
        <CardDescription>Manage and monitor your api server instance</CardDescription>
        <ServiceState state="Running" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 w-full">
          <Button className="flex-1 rounded-sm gap-3" variant="outlined_ghost">
            <Play />
            Start
          </Button>
          <Button className="flex-1 rounded-sm gap-3" variant="outlined_ghost">
            <Square />
            Stop
          </Button>
          <Button className="flex-1 rounded-sm gap-3" variant="outlined_ghost">
            <RefreshCw />
            Restart
          </Button>
        </div>
      </CardContent>
    </_Card>
  );
}

export default Card;
