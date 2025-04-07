import { createContext, useContext, useCallback, ReactNode } from 'react';
import { processManager } from '@/features/server-management/services/processManager';
import type { Command, Child } from '@tauri-apps/plugin-shell';

interface ProcessContextType {
  startProcess: (
    serviceId: string,
    args: string[]
  ) => Promise<{
    command: Command<string>;
    child: Child;
  }>;
  stopProcess: (serviceId: string) => Promise<void>;
  subscribeToOutput: (
    serviceId: string,
    callback: (output: { type: 'stdout' | 'stderr'; data: string }) => void
  ) => () => void;
}

const ProcessContext = createContext<ProcessContextType | null>(null);

export function ProcessProvider({ children }: { children: ReactNode }) {
  const startProcess = useCallback(async (serviceId: string, args: string[]) => {
    return processManager.startProcess(serviceId, args);
  }, []);

  const stopProcess = useCallback(async (serviceId: string) => {
    await processManager.stopProcess(serviceId);
  }, []);

  const subscribeToOutput = useCallback(
    (
      serviceId: string,
      callback: (output: { type: 'stdout' | 'stderr'; data: string }) => void
    ) => {
      return processManager.subscribeToOutput(serviceId, callback);
    },
    []
  );

  return (
    <ProcessContext.Provider
      value={{
        startProcess,
        stopProcess,
        subscribeToOutput
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error('useProcess must be used within a ProcessProvider');
  }
  return context;
}
