import { useState, useEffect } from 'react';
import { useProcess } from '@/features/server-management/context/ProcessContext';

export function useServiceOutput(serviceId: string) {
  const [output, setOutput] = useState<Array<{ type: 'stdout' | 'stderr'; data: string }>>([]);
  const { subscribeToOutput } = useProcess();

  useEffect(() => {
    const unsubscribe = subscribeToOutput(serviceId, (newOutput) => {
      setOutput((prev) => [...prev, newOutput]);
    });

    return () => {
      unsubscribe();
    };
  }, [serviceId, subscribeToOutput]);

  const clearOutput = () => setOutput([]);

  return {
    output,
    clearOutput
  };
}
