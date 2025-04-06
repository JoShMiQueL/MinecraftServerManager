import { cn } from '@/utils/tw-utils';
import { type Child, Command } from '@tauri-apps/plugin-shell';
import { Circle, Play, RefreshCw, Server, Square } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from '@/components/ui/card';
import { ServiceCardProps, ServiceStateProps, ServiceStateType } from '../types';

function ServiceState({ className, state, ...props }: ServiceStateProps) {
  const stateColorMap = {
    Running: 'var(--color-green-500)',
    Stopped: 'var(--color-red-500)',
    Restarting: 'var(--color-yellow-500)',
    Stopping: 'var(--color-orange-500)',
    Starting: 'var(--color-blue-500)',
    'N/A': 'var(--color-gray-500)'
  };
  const stateColor = stateColorMap[state as keyof typeof stateColorMap] || stateColorMap['N/A'];
  return (
    <div className={cn('flex items-center gap-2 mt-2 font-medium', className)} {...props}>
      <Circle className="size-3.5" color={stateColor} fill={stateColor} />
      {state}
    </div>
  );
}

export function ServiceCard({
  title = 'Placeholder',
  description = 'Placeholder description',
  initialState = 'N/A',
  commandName,
  onLog
}: ServiceCardProps) {
  const [state, setState] = useState<ServiceStateType>(initialState);
  const [process, setProcess] = useState<Child | null>(null);

  const updateState = (newState: ServiceStateType) => {
    console.log(`[ServiceCard] State change: ${state} -> ${newState}`);
    setState(newState);
  };

  return (
    <Card className="font-[Geist_Sans] rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
          <Server size={20} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <ServiceState state={state} />
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 rounded-sm gap-3"
            variant="outlined_ghost"
            onClick={() => {
              if (state === 'Running' || state === 'Starting') {
                console.log(`[ServiceCard] Start blocked: current state is ${state}`);
                return;
              }
              console.log(`[ServiceCard] Creating command: ${commandName}`);
              const command = Command.create(commandName);
              updateState('Starting');
              onLog?.(`[${new Date().toISOString()}] [INFO] Starting service...`);
              command.spawn().then((childProcess) => {
                console.log('[ServiceCard] Process spawned');
                setProcess(childProcess);
                command.stdout.on('data', (line) => {
                  console.log(`[ServiceCard] stdout: ${line}`);
                  if (line) {
                    onLog?.(`[${new Date().toISOString()}] [INFO] ${line}`);
                    const regex = /Server running at http:\/\/localhost:\d+/;
                    if (regex.test(line)) {
                      updateState('Running');
                    }
                  }
                });
                command.stderr.on('data', (line) => {
                  if (line) {
                    onLog?.(`[${new Date().toISOString()}] [ERROR] ${line}`);
                  }
                });
                command.on('close', () => {
                  updateState('Stopped');
                  setProcess(null);
                });
              });
            }}
          >
            <Play />
            Start
          </Button>
          <Button
            className="flex-1 rounded-sm gap-3"
            variant="outlined_ghost"
            onClick={() => {
              if (!process || state === 'Stopped' || state === 'Stopping') {
                console.log(`[ServiceCard] Stop blocked: current state is ${state}`);
                return;
              }
              updateState('Stopping');
              console.log('[ServiceCard] Killing process');
              onLog?.(`[${new Date().toISOString()}] [INFO] Stopping service...`);
              process.kill().then(() => {
                updateState('Stopped');
                setProcess(null);
                onLog?.(`[${new Date().toISOString()}] [INFO] Service stopped`);
              });
            }}
          >
            <Square />
            Stop
          </Button>
          <Button
            className="flex-1 rounded-sm gap-3"
            variant="outlined_ghost"
            onClick={() => {
              if (!process || state !== 'Running') {
                console.log(`[ServiceCard] Restart blocked: current state is ${state}`);
                return;
              }
              updateState('Restarting');
              console.log('[ServiceCard] Killing process for restart');
              process.kill().then(() => {
                const command = Command.create(commandName);
                command.spawn().then((childProcess) => {
                  setProcess(childProcess);
                  command.stdout.on('data', (line) => {
                    if (line) {
                      onLog?.(`[${new Date().toISOString()}] [INFO] ${line}`);
                      const regex = /Server running at http:\/\/localhost:\d+/;
                      if (regex.test(line)) {
                        updateState('Running');
                      }
                    }
                  });
                  command.stderr.on('data', (line) => {
                    if (line) {
                      onLog?.(`[${new Date().toISOString()}] [ERROR] ${line}`);
                    }
                  });
                  command.on('close', () => {
                    updateState('Stopped');
                    setProcess(null);
                  });
                  command.on('error', (error) => {
                    console.log(`[ServiceCard] Process error: ${error}`);
                    onLog?.(`[${new Date().toISOString()}] [ERROR] ${error}`);
                    updateState('Stopped');
                    setProcess(null);
                  });
                });
              });
            }}
          >
            <RefreshCw />
            Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
