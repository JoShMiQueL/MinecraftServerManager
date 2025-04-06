import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceLogControls } from './service-log-controls';
import { useServiceLogs } from '../hooks';
import { ConsoleViewer } from '@/features/console/components';
import type { ServiceLogViewerProps } from '../types';

export function ServiceLogViewer({ title, initialLogs = [] }: ServiceLogViewerProps) {
  const { logs, downloadLogs } = useServiceLogs({ initialLogs });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <ServiceLogControls onDownload={downloadLogs} />
      </CardHeader>
      <CardContent>
        <ConsoleViewer logs={logs} />
      </CardContent>
    </Card>
  );
}
