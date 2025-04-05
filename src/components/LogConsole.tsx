import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function FontSizeSelector({
  fontSize,
  setFontSize,
}: {
  fontSize: "xs" | "sm" | "base";
  setFontSize: (fontSize: "xs" | "sm" | "base") => void;
}) {
  const fontSizes = [
    { value: "xs", label: "Small" },
    { value: "sm", label: "Medium" },
    { value: "base", label: "Large" },
  ];

  return (
    <Select value={fontSize} onValueChange={setFontSize}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fontSizes.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function Console({ logs }: { logs: string[] }) {
  const [fontSize, setFontSize] = useState<"xs" | "sm" | "base">(() => {
    const savedFontSize = localStorage.getItem("logConsoleFontSize");
    return (savedFontSize as "xs" | "sm" | "base") || "sm";
  });
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("logConsoleFontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    setFilteredLogs(logs.filter((log) => log.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [logs, searchTerm]);

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
          <Checkbox variant="square" id="auto-scroll" defaultChecked />
          <label htmlFor="auto-scroll">Auto-scroll</label>
        </div>
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
      </div>
      <div
        className={`mt-4 h-[400px] overflow-y-auto rounded-md bg-black p-3 font-mono text-${fontSize} text-green-400`}
      >
        {filteredLogs.map((log, index) => {
          // Extract timestamp from log entry or use index as fallback
          const timestamp = log.match(/\[(.*?)\]/)?.[1] || "";
          const key = `${timestamp}-${index}`;
          return <pre key={key}>{log}</pre>;
        })}
      </div>
    </>
  );
}

function LogConsole({ title, logs }: { title: string; logs: string[] }) {
  const [currentLogs, setCurrentLogs] = useState(logs);

  const refreshLogs = () => {
    // Simulating log refresh
    const newLog = `[${new Date().toISOString()}] [INFO] Log refreshed`;
    setCurrentLogs([...currentLogs, newLog]);
  };

  const downloadLogs = () => {
    const blob = new Blob([currentLogs.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outlined_ghost" className="gap-3 h-10" onClick={refreshLogs}>
            <RefreshCw />
            Refresh
          </Button>
          <Button variant="outlined_ghost" className="gap-3 h-10" onClick={downloadLogs}>
            <Download />
            Download
          </Button>
          <Button variant="outlined_ghost" className="gap-3 h-10">
            Go Live
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Console logs={currentLogs} />
      </CardContent>
    </Card>
  );
}

export default LogConsole;
