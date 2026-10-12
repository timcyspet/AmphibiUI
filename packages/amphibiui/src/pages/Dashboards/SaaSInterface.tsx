import { Badge, Progressbar } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { months, saasMetrics, saasMrrTrend, saasRegions } from "./mockData.js";

export function SaaSInterface() {
  return <DashboardPageFrame title="SaaS operations" description="Track recurring revenue, new registrations, and cloud service health.">
    <MetricGrid items={saasMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="line" title="Recurring revenue" description="MRR growth · USD thousands" data={{
        labels: months, datasets: [{ label: "MRR", data: saasMrrTrend, tension: 0.35, fill: true }],
      }} />
      <div className="aui-stack">
        <Progressbar label="API availability · 99.98%" value={99.98} />
        <Progressbar label="Compute capacity · 64%" value={64} />
        <Progressbar label="Storage capacity · 72%" value={72} />
      </div>
    </div>
    <DashboardTable title="Infrastructure by region" columns={["Region", "CPU", "Memory", "Latency", "Requests/min", "Health"]}
      rows={saasRegions.map((region) => [<strong>{region.region}</strong>, <Progressbar label={`CPU ${region.cpu}%`} value={region.cpu} />, <Progressbar label={`Memory ${region.memory}%`} value={region.memory} />, region.latency, region.requests, <Badge tone={statusTone(region.cpu > 80 ? "High load" : "Healthy")}>{region.cpu > 80 ? "High load" : "Healthy"}</Badge>])} />
  </DashboardPageFrame>;
}

export default SaaSInterface;
