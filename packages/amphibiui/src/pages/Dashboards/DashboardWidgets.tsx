import { Children, isValidElement, type ReactNode } from "react";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DemographicMap } from "../../components/Charts/DemographicMap.js";
import { DashboardGrid, type DashboardGridWidget } from "../../components/Layout/DashboardGrid.js";
import { Badge, Card } from "../../components/Elements/index.js";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  tone?: "default" | "success" | "warning" | "danger";
}

export function statusTone(status: string): "default" | "success" | "warning" | "danger" {
  if (/^\+|on time|healthy|active|cleared|won|exceeds|in stock|paid/i.test(status)) return "success";
  if (/delay|thrott|low|pending|review|developing|watch/i.test(status)) return "warning";
  if (/^-|out of stock|critical|failed|overdue/i.test(status)) return "danger";
  return "default";
}

export function DashboardPageFrame({ title, description, children, action }: {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const dashboardId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return <div className="aui-dashboard-variant">
    <div className="aui-page-intro"><div><h2>{title}</h2><p>{description}</p></div>{action}</div>
    <DashboardGrid dashboardId={dashboardId} widgets={createDashboardWidgets(children)} />
  </div>;
}

export function MetricGrid({ items, columns = 4 }: { items: DashboardMetric[]; columns?: 3 | 4 }) {
  return <div className="aui-variant-metrics" data-columns={columns}>
    {items.map((item) => <Card className="aui-variant-metric" key={item.label}>
      <p>{item.label}</p>
      <div><strong>{item.value}</strong><Badge tone={item.tone ?? "success"}>{item.change}</Badge></div>
    </Card>)}
  </div>;
}

export function DashboardTable({ title, description, columns, rows }: {
  title: string;
  description?: string;
  columns: string[];
  rows: ReactNode[][];
}) {
  const { framework } = useAmphibiUIOptional();
  return <Card className="aui-variant-table-card">
    <div className="aui-variant-table-heading"><div><h3>{title}</h3>{description && <p>{description}</p>}</div></div>
    <div className="aui-table-wrap"><table className={`aui-table aui-dashboard-table-${framework}`}>
      <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  </Card>;
}

function createDashboardWidgets(children: ReactNode): DashboardGridWidget[] {
  const expanded = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ className?: string; children?: ReactNode }>(child) || child.type !== "div") return [child];
    const className = child.props.className ?? "";
    if (!className.includes("aui-variant-grid-2")) return [child];

    const group = Children.toArray(child.props.children);
    return group.length > 0 && group.every(isDashboardChart) ? group : [child];
  });
  const counts = new Map<string, number>();

  return expanded.map((content, index) => {
    const kind = widgetKind(content);
    const occurrence = counts.get(kind) ?? 0;
    counts.set(kind, occurrence + 1);
    const props = isValidElement<{ title?: string }>(content) ? content.props : undefined;
    const labels: Record<string, string> = {
      metrics: "Key metrics",
      chart: props?.title ?? "Chart",
      table: props?.title ?? "Data table",
      map: "Audience map",
    };

    return {
      id: `${kind}-${occurrence}`,
      label: labels[kind] ?? `Widget ${index + 1}`,
      content,
      defaultWidth: kind === "chart" ? "half" : "full",
      defaultHeight: kind === "metrics" ? 5 : kind === "chart" ? 12 : kind === "table" ? 10 : kind === "map" ? 11 : 10,
    };
  });
}

function isDashboardChart(child: ReactNode): boolean {
  return isValidElement(child) && child.type === DashboardChart;
}

function widgetKind(child: ReactNode) {
  if (!isValidElement(child)) return "widget";
  if (child.type === MetricGrid) return "metrics";
  if (child.type === DashboardChart) return "chart";
  if (child.type === DashboardTable) return "table";
  if (child.type === DemographicMap) return "map";
  return "widget";
}
