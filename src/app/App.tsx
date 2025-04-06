import '@/app/index.css';
import { ThemeSelector } from '@/features/theme';

function App() {
  return (
    <main className="min-h-screen">
      <ThemeSelector className="absolute bottom-2 right-2" />
      HOLA
    </main>
  );
}

export default App;
