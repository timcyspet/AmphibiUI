import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { months, salesChannelRevenue, salesConversionTrend, salesDeals, salesMetrics } from "./mockData.js";

export function SalesDashboard() {
  return <DashboardPageFrame title="Sales performance" description="Track revenue streams, pipeline velocity, and conversion." action={<Button>＋ New deal</Button>}>
    <MetricGrid items={salesMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="bar" title="Revenue by channel" description="Monthly sales across retail channels" data={{
        labels: ["Online store", "Retail", "Marketplace", "Wholesale"],
        datasets: salesChannelRevenue.map((series) => ({ ...series, borderRadius: 5 })),
      }} />
      <DashboardChart type="line" title="Conversion rate" description="Lead-to-customer conversion" data={{
        labels: months, datasets: [{ label: "Conversion", data: salesConversionTrend, tension: 0.35 }],
      }} />
    </div>
    <DashboardTable title="Deals pipeline" description="Weighted opportunity value · sorted by close probability" columns={["Company", "Owner", "Stage", "Value", "Probability"]}
      rows={salesDeals.map((deal) => [<strong>{deal.company}</strong>, deal.owner, <Badge tone={statusTone(deal.stage)}>{deal.stage}</Badge>, deal.value, deal.probability])} />
  </DashboardPageFrame>;
}

export default SalesDashboard;
