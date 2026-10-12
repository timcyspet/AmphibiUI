import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import type { ColumnDefinition } from "tabulator-tables";
import { useAmphibiUI } from "../../context/AmphibiUIContext.js";

export interface TabulatorDataTableProps {
  data: Record<string, string | number | boolean>[];
  columns: ColumnDefinition[];
  paginationSize?: number;
  height?: string | number;
  ariaLabel?: string;
  className?: string;
}

export function TabulatorDataTable({
  data,
  columns,
  paginationSize = 5,
  height = "380px",
  ariaLabel = "Data table",
  className,
}: TabulatorDataTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { framework } = useAmphibiUI();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const table = new Tabulator(container, {
      data,
      columns,
      height,
      layout: "fitColumns",
      movableColumns: true,
      pagination: true,
      paginationMode: "local",
      paginationSize,
      placeholder: "No matching records",
    });

    return () => table.destroy();
  }, [columns, data, height, paginationSize]);

  return (
    <div
      className={["aui-tabulator", className].filter(Boolean).join(" ")}
      data-framework={framework}
      role="region"
      aria-label={ariaLabel}
    >
      <div ref={containerRef} />
    </div>
  );
}
