import "./index.css";
import Card from "@/components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogConsole from "./components/LogConsole";
import Overview from "./components/Overview";

function App() {
  const mockAPILogs = [
    "[2025-04-05T23:11:47.123Z] [INFO] Server started on port 3000",
    "[2025-04-05T23:11:47.123Z] [INFO] Received API request: GET /api/users",
    "[2025-04-05T23:11:47.123Z] [INFO] Database connection established",
    "[2025-04-05T23:11:47.123Z] [INFO] User authentication failed",
    "[2025-04-05T23:11:47.123Z] [INFO] Cache cleared successfully",
    "[2025-04-05T23:11:47.123Z] [INFO] Processing batch job #1234",
    "[2025-04-05T23:11:47.123Z] [INFO] Memory usage: 256MB",
    "[2025-04-05T23:11:47.123Z] [INFO] API rate limit reached for IP: 192.168.1.1",
    "[2025-04-05T23:11:47.123Z] [INFO] New user registered: john@example.com",
  ];
  const mockMinecraftLogs = [
    "[2025-04-05T23:11:47.123Z] [INFO] Server started on port 25565",
    "[2025-04-05T23:11:47.123Z] [INFO] Player joined: john",
    "[2025-04-05T23:11:47.123Z] [INFO] Player left: john",
    "[2025-04-05T23:11:47.123Z] [INFO] Server stopped",
  ];
  return (
    <main className="bg-background min-h-screen text-[oklch(95%_0_0)]">
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Server Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and control your API and Minecraft servers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card />
          <Card />
        </div>
        <Tabs defaultValue="api" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="minecraft">Minecraft</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="api">
            <LogConsole title="API Server Logs" logs={mockAPILogs} />
          </TabsContent>
          <TabsContent value="minecraft">
            <LogConsole title="Minecraft Server Logs" logs={mockMinecraftLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
