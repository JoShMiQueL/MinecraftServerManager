import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Circle, Clock, Server } from 'lucide-react';
import { cn } from '@/utils/tw-utils';
import { CardItemProps } from '../types';

function CardItem({
  title = 'Placeholder',
  icon: Icon = Clock,
  description = 'Manage and monitor your API server instance',
  iconProps = {}
}: CardItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn('flex items-center justify-between')}>
          {title}
          <Icon
            size={16}
            className={cn('text-muted-foreground/80', iconProps.className)}
            {...iconProps}
          />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function OverviewTab() {
  return (
    <Tabs defaultValue="api" className="mt-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="api">API Server</TabsTrigger>
        <TabsTrigger value="server">Minecraft Server</TabsTrigger>
      </TabsList>
      <TabsContent value="api" className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <CardItem />
        <CardItem title="Cipote" description="WOWWW" icon={Server} />
        <CardItem
          icon={Circle}
          iconProps={{
            color: 'var(--color-green-500)',
            fill: 'var(--color-green-500)'
          }}
        />
      </TabsContent>
      <TabsContent value="server">LOL</TabsContent>
    </Tabs>
  );
}
