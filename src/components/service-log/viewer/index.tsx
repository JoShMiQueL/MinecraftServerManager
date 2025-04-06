import { ConsoleViewer } from "@/components/console";
import { ServiceLogControls } from "@/components/service-log/controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServiceLogs } from "@/hooks/service-log";
import type { ServiceLogViewerProps } from "@/types/log-console";

export function ServiceLogViewer({ title, initialLogs = [], onGoLive }: ServiceLogViewerProps) {
  const { logs, refreshLogs, downloadLogs } = useServiceLogs({ initialLogs });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <ServiceLogControls onRefresh={refreshLogs} onDownload={downloadLogs} onGoLive={onGoLive} />
      </CardHeader>
      <CardContent>
        <ConsoleViewer logs={logs} />
      </CardContent>
    </Card>
  );
}
