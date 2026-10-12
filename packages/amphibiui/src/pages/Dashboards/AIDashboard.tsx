import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { aiLatencyTrend, aiMetrics, aiModelUsage, aiTokenTrend, months } from "./mockData.js";

export function AIDashboard() {
  return <DashboardPageFrame title="AI operations" description="Monitor model performance, token consumption, and inference spend." action={<Button>Manage API keys</Button>}>
    <MetricGrid items={aiMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="bar" title="Token usage" description="Millions of tokens processed per month" data={{
        labels: months, datasets: [{ label: "Tokens (M)", data: aiTokenTrend, borderRadius: 5 }],
      }} />
      <DashboardChart type="line" title="Inference latency" description="Average response time in milliseconds" data={{
        labels: months, datasets: [{ label: "Latency", data: aiLatencyTrend, tension: 0.35 }],
      }} />
    </div>
    <DashboardTable title="Model usage and billing" columns={["Model", "Requests", "Tokens", "Latency", "Cost", "Status"]}
      rows={aiModelUsage.map((model) => [<strong>{model.model}</strong>, model.requests, model.tokens, model.latency, model.cost, <Badge tone={statusTone(model.status)}>{model.status}</Badge>])} />
  </DashboardPageFrame>;
}

export default AIDashboard;
