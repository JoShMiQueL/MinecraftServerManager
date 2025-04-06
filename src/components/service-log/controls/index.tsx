import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface ServiceLogControlsProps {
  readonly onRefresh: () => void;
  readonly onDownload: () => void;
  readonly onGoLive?: () => void;
}

export function ServiceLogControls({ onRefresh, onDownload, onGoLive }: ServiceLogControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outlined_ghost"
        className="gap-3 h-10"
        onClick={onRefresh}
        title="Refresh logs"
      >
        <RefreshCw className="size-4" />
        <span>Refresh</span>
      </Button>
      <Button
        variant="outlined_ghost"
        className="gap-3 h-10"
        onClick={onDownload}
        title="Download logs as text file"
      >
        <Download className="size-4" />
        <span>Download</span>
      </Button>
      {onGoLive && (
        <Button
          variant="outlined_ghost"
          className="gap-3 h-10"
          onClick={onGoLive}
          title="Enable live log updates"
        >
          Go Live
        </Button>
      )}
    </div>
  );
}
