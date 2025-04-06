import { ThemeProvider } from '@/components/ThemeProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
