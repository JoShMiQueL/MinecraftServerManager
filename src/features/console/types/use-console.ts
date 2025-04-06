import type { FontSize } from './console';

export interface UseConsoleProps {
  readonly initialLogs?: readonly string[];
}

export interface UseConsoleReturn {
  readonly logList: readonly string[];
  readonly setLogList: React.Dispatch<React.SetStateAction<readonly string[]>>;
  readonly fontSize: FontSize;
  readonly setFontSize: (fontSize: FontSize) => void;
  readonly filteredLogs: readonly string[];
  readonly searchTerm: string;
  readonly setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  readonly autoScroll: boolean;
  readonly setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  readonly clearLogs: () => void;
}
