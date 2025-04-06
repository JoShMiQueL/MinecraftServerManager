export interface ServiceLogViewerProps {
  readonly title: string;
  readonly initialLogs?: readonly string[];
}

export interface ServiceLogControlsProps {
  readonly onDownload: () => void;
}

export interface UseServiceLogsProps {
  readonly initialLogs?: readonly string[];
}
