import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ServiceLogControlsProps } from '../types';

export function ServiceLogControls({ onDownload }: ServiceLogControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outlined_ghost"
        className="gap-3 h-10"
        onClick={onDownload}
        title="Download logs as text file"
      >
        <Download className="size-4" />
        <span>Download</span>
      </Button>
    </div>
  );
}
