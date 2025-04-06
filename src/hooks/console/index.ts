import type { FontSize } from "@/types/log-console";
import { useCallback, useEffect, useState } from "react";

export function useConsole(initialLogs: readonly string[] = []) {
  const [logList, setLogList] = useState<readonly string[]>(initialLogs);
  const [lastKnownLength, setLastKnownLength] = useState(initialLogs.length);
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const savedFontSize = localStorage.getItem("logConsoleFontSize");
    return (savedFontSize as FontSize) || "sm";
  });
  const [filteredLogs, setFilteredLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    // Only add new logs that weren't there before
    if (initialLogs.length > lastKnownLength) {
      const newLogs = initialLogs.slice(lastKnownLength);
      setLogList((current) => [...current, ...newLogs]);
      setLastKnownLength(initialLogs.length);
    }
  }, [initialLogs, lastKnownLength]);

  useEffect(() => {
    localStorage.setItem("logConsoleFontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    setFilteredLogs(logList.filter((log) => log.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [logList, searchTerm]);

  const clearLogs = useCallback(() => {
    setLogList([]);
    setSearchTerm("");
    setLastKnownLength(initialLogs.length);
  }, [initialLogs.length]);

  return {
    logList,
    setLogList,
    fontSize,
    setFontSize,
    filteredLogs,
    searchTerm,
    setSearchTerm,
    autoScroll,
    setAutoScroll,
    clearLogs,
  };
}
