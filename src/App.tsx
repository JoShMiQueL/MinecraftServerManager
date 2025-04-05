import "./index.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

function App() {
  return (
    <main className="bg-background min-h-screen text-[oklch(95%_0_0)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="font-[Geist_Sans]">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
              <Server size={20} />
              API Server
            </CardTitle>
            <CardDescription>Manage and monitor your api server instance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Running</p>
          </CardContent>
        </Card>
        <Card className="font-[Geist_Sans]">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
              <Server size={20} />
              API Server
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Running</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default App;
