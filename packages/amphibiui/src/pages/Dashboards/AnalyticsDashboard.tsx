import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DemographicMap } from "../../components/Charts/DemographicMap.js";
import { DashboardPageFrame, DashboardTable, MetricGrid } from "./DashboardWidgets.js";
import { analyticsDemographicLocations, analyticsDeviceShare, analyticsMetrics, analyticsSources, analyticsTrafficTrend, months } from "./mockData.js";

export function AnalyticsDashboard() {
  return <DashboardPageFrame title="Web analytics" description="Understand acquisition, visitor engagement, and conversion across your properties.">
    <MetricGrid items={analyticsMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="line" title="Traffic acquisition" description="Sessions by month" data={{
        labels: months,
        datasets: analyticsTrafficTrend.map((series) => ({ ...series, tension: 0.35 })),
      }} />
      <DashboardChart type="doughnut" title="Device breakdown" description="Sessions by device" data={{
        labels: ["Desktop", "Mobile", "Tablet"], datasets: [{ data: analyticsDeviceShare }],
      }} options={{ cutout: "66%", plugins: { legend: { position: "bottom" } } }} />
    </div>
    <DemographicMap locations={analyticsDemographicLocations} />
    <DashboardTable title="Acquisition sources" columns={["Source", "Sessions", "Conversion rate", "Bounce rate"]}
      rows={analyticsSources.map((source) => [<strong>{source.source}</strong>, source.sessions, source.conversion, source.bounce])} />
  </DashboardPageFrame>;
}

export default AnalyticsDashboard;
