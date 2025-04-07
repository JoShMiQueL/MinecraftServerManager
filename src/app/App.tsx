import '@/app/index.css';
import { SiteTitle } from '@/components/SiteTitle';
import { ProcessProvider } from '@/features/server-management/context/ProcessContext';
import { ServiceConsole } from '@/features/server-management/components/ServiceConsole';
// import { ServiceStatusCard } from '@/features/server-management/components/ServiceStatusCard';
import { ThemeSelector } from '@/features/theme';
import { processManager } from '@/features/server-management/services/processManager';
import { useEffect, useState } from 'react';

function App() {
  const [apiStarted, setApiStarted] = useState(false);

  useEffect(() => {
    processManager.stopAllProcesses().then(() => {
      if (!apiStarted) {
        if (!processManager.getProcesses().has('api')) {
          processManager
            .startProcess('api', [])
            .then(() => setApiStarted(true))
            .catch((error) => {
              console.error('Failed to start API process:', error);
              setApiStarted(false);
            });
        } else {
          console.warn('API process already running, skipping start');
          setApiStarted(true);
        }
      }
    });
  }, [apiStarted]);
  return (
    <ProcessProvider>
      <ThemeSelector className="absolute bottom-2 right-2" />
      <SiteTitle
        title="Server Management Dashboard"
        subtitle="Monitor and control your API and Minecraft servers"
      />
      {/* <ServiceStatusCard
        className="mt-6"
        title="API Server"
        description="Manage and monitor your api server instance"
        service={{
          serviceId: 'api'
        }}
      /> */}
      <ServiceConsole serviceId="api" className="mt-6" />
      <ServiceConsole serviceId="minecraft" className="mt-6" />
    </ProcessProvider>
  );
}

export default App;
