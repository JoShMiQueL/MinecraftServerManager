export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
}

export interface ThemeProviderState {
  readonly theme: Theme;
  readonly setTheme: (theme: Theme) => void;
}
