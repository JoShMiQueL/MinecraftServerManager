import { useServiceOutput } from '@/features/server-management/hooks/useServiceOutput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tw-utils';

interface ServiceConsoleProps {
  serviceId: string;
  className?: string;
}

export function ServiceConsole({ serviceId, className }: ServiceConsoleProps) {
  const { output, clearOutput } = useServiceOutput(serviceId);

  return (
    <Card className={className}>
      <div className="flex justify-between items-center p-2 border-b">
        <h3 className="text-sm font-medium">Console Output</h3>
        <Button variant="ghost" size="sm" onClick={clearOutput}>
          Clear
        </Button>
      </div>
      <ScrollArea className="h-[300px] p-2">
        <pre className="font-mono text-sm whitespace-pre-wrap">
          {output.map((line, index) => (
            <span
              key={index}
              className={cn('block', line.type === 'stderr' ? 'text-red-500' : 'text-green-500')}
            >
              {line.data}
            </span>
          ))}
        </pre>
      </ScrollArea>
    </Card>
  );
}
