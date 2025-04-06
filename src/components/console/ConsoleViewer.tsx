import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useConsole } from "@/hooks/console";
import type { ConsoleViewerProps } from "@/types/log-console";
import { Eraser, Search } from "lucide-react";
import { FontSizeSelector } from "./FontSizeSelector";

export function ConsoleViewer({ logs = [] }: ConsoleViewerProps) {
  const {
    filteredLogs,
    fontSize,
    setFontSize,
    searchTerm,
    setSearchTerm,
    autoScroll,
    setAutoScroll,
    clearLogs,
  } = useConsole(logs);

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <Input
          className="w-full"
          type="search"
          placeholder="Search logs..."
          icon={<Search size={16} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Button
            variant="outlined_ghost"
            className="flex items-center gap-2 h-8 px-2"
            onClick={clearLogs}
          >
            <Eraser size={14} />
            Clear
          </Button>
          <Checkbox
            id="autoscroll"
            className="size-4"
            checked={autoScroll}
            onCheckedChange={(checked) => setAutoScroll(checked === true)}
          />
          <label htmlFor="autoscroll">Auto-scroll</label>
        </div>
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
      </div>
      <div
        className={`mt-4 h-[400px] overflow-y-auto rounded-md bg-black p-3 font-mono text-${fontSize} text-green-400`}
        ref={(el) => {
          if (el && autoScroll) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {filteredLogs.map((log) => {
          const timestamp = log.match(/\[(.*?)\]/)?.[1] || "";
          const key = `log-${timestamp}-${log.slice(0, 20)}`;
          const parts = log.split(/(https?:\/\/\S+)/).map((part) => {
            if (part.match(/^https?:\/\//)) {
              return (
                <a key={`link-${part}`} href={part} target="_blank" rel="noopener noreferrer">
                  {part}
                </a>
              );
            }
            return part;
          });

          return <pre key={key}>{parts}</pre>;
        })}
      </div>
    </>
  );
}
