import '@/app/index.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { OverviewTab } from '@/features/server-management/components/overview-tab';
import { ServiceCard } from '@/features/server-management/components/service-card';
import { ServiceLogViewer } from '@/features/server-management/components/service-log-viewer';

function App() {
  const [apiLogs, setApiLogs] = useState<string[]>([]);

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
          <ServiceCard
            title="API Server"
            description="Manage and monitor your api server instance"
            initialState="Stopped"
            commandName="api"
            onLog={(log) => setApiLogs((logs) => [...logs, log])}
          />
        </div>
        <Tabs defaultValue="api" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="api">
            <ServiceLogViewer title="API Server Logs" initialLogs={apiLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
