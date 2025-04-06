import { useCallback, useEffect, useState } from 'react';

interface UseServiceLogsProps {
  readonly initialLogs?: readonly string[];
}

export function useServiceLogs({ initialLogs = [] }: UseServiceLogsProps) {
  const [logs, setLogs] = useState<readonly string[]>(initialLogs);

  useEffect(() => {
    setLogs(initialLogs);
  }, [initialLogs]);

  const refreshLogs = useCallback(() => {
    const newLog = `[${new Date().toISOString()}] [INFO] Log refreshed`;
    setLogs((currentLogs) => [...currentLogs, newLog]);
  }, []);

  const downloadLogs = useCallback(() => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'server-logs.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [logs]);

  return {
    logs,
    refreshLogs,
    downloadLogs
  };
}
