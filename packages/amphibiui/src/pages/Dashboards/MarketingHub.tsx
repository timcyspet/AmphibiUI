import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { marketingCampaigns, marketingConversionTrend, marketingMetrics, marketingRevenueTrend, marketingSpendTrend, months } from "./mockData.js";

export function MarketingHub() {
  return <DashboardPageFrame title="Marketing hub" description="Compare campaign spend, return on investment, and conversion performance." action={<Button>＋ Create campaign</Button>}>
    <MetricGrid items={marketingMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="bar" title="Spend vs. attributed revenue" description="Monthly totals · USD thousands" data={{
        labels: months,
        datasets: [
          { label: "Ad spend", data: marketingSpendTrend, borderRadius: 5 },
          { label: "Revenue", data: marketingRevenueTrend, borderRadius: 5 },
        ],
      }} />
      <DashboardChart type="line" title="Campaign conversion rate" description="Landing page conversion" data={{
        labels: months, datasets: [{ label: "Conversion", data: marketingConversionTrend, tension: 0.35 }],
      }} />
    </div>
    <DashboardTable title="Campaign performance" columns={["Campaign", "Platform", "Spend", "Revenue", "ROAS", "Status"]}
      rows={marketingCampaigns.map((campaign) => [<strong>{campaign.campaign}</strong>, campaign.platform, campaign.spend, campaign.revenue, campaign.roi, <Badge tone={statusTone(campaign.status)}>{campaign.status}</Badge>])} />
  </DashboardPageFrame>;
}

export default MarketingHub;
