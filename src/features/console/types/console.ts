export type FontSize = 'xs' | 'sm' | 'base';

export interface FontSizeOption {
  readonly value: FontSize;
  readonly label: string;
}

export interface FontSizeSelectorProps {
  readonly fontSize: FontSize;
  readonly setFontSize: (fontSize: FontSize) => void;
}

export interface ConsoleViewerProps {
  readonly logs?: readonly string[];
}
