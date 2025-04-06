export interface ServiceLogViewerProps {
  readonly title: string;
  readonly initialLogs?: readonly string[];
  readonly onGoLive?: () => void;
}
