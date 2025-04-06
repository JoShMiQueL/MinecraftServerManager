import '@/app/index.css';
import { SiteTitle } from '@/components/site-title';
import { ThemeSelector } from '@/features/theme';

function App() {
  return (
    <>
      <ThemeSelector className="absolute bottom-2 right-2" />
      <SiteTitle
        title="Server Management Dashboard"
        subtitle="Manage and monitor your api server instance"
      />
    </>
  );
}

export default App;
