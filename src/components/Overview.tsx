import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, Clock, type LucideProps, Server } from "lucide-react";

import { cn } from "@/lib/utils";

function _Card({
  title = "Placeholder",
  icon: Icon = Clock,
  description = "Manage and monitor your API server instance",
  iconProps = {},
}: {
  title?: string;
  icon?: React.ComponentType<LucideProps>;
  description?: string;
  iconProps?: Partial<LucideProps>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("flex items-center justify-between")}>
          {title}
          <Icon
            size={16}
            className={cn("text-muted-foreground/80", iconProps.className)}
            {...iconProps}
          />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function Overview() {
  return (
    <Tabs defaultValue="api" className="mt-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="api">API Server</TabsTrigger>
        <TabsTrigger value="server">Minecraft Server</TabsTrigger>
      </TabsList>
      <TabsContent value="api" className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <_Card />
        <_Card title="Cipote" description="WOWWW" icon={Server} />
        <_Card
          icon={Circle}
          iconProps={{
            color: "var(--color-green-500)",
            fill: "var(--color-green-500)",
          }}
        />
      </TabsContent>
      <TabsContent value="server">LOL</TabsContent>
    </Tabs>
  );
}

export default Overview;
