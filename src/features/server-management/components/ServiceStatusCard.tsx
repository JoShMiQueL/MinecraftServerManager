import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerIcon, CircleIcon, PlayIcon, SquareIcon } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useProcess } from '@/features/server-management/context/ProcessContext';

interface ServiceConfig {
  serviceId: string;
  args?: string[];
}

interface ServiceStatusCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  description: string;
  service: ServiceConfig;
}

export function ServiceStatusCard({
  title,
  description,
  service: { serviceId, args = [] },
  ...props
}: ServiceStatusCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { startProcess, stopProcess } = useProcess();

  const handleStart = useCallback(async () => {
    try {
      setIsLoading(true);
      await startProcess(serviceId, args);
      setIsRunning(true);
    } catch (error) {
      console.error('Failed to start service:', error);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId, args, startProcess]);

  const handleStop = useCallback(async () => {
    try {
      setIsLoading(true);
      await stopProcess(serviceId);
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to stop service:', error);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId, stopProcess]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
          <ServerIcon size={20} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="-mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-medium flex items-center gap-2">
            <CircleIcon
              size={14}
              className={isRunning ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'}
            />
            {isRunning ? 'Running' : 'Stopped'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={isRunning ? handleStop : handleStart}
            disabled={isLoading}
          >
            {isLoading ? (
              'Loading...'
            ) : isRunning ? (
              <>
                <SquareIcon size={16} className="mr-2" />
                Stop
              </>
            ) : (
              <>
                <PlayIcon size={16} className="mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
