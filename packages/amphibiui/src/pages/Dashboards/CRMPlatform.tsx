import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { crmLeads, crmLifecycleStages, crmMetrics, crmNewLeadTrend, months } from "./mockData.js";

export function CRMPlatform() {
  return <DashboardPageFrame title="CRM platform" description="Manage customer lifecycles, pipeline ownership, and retention." action={<Button>＋ Add lead</Button>}>
    <MetricGrid items={crmMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="doughnut" title="Lifecycle stages" description="Active opportunities by current stage" data={{
        labels: ["Discovery", "Qualified", "Proposal", "Negotiation"],
        datasets: [{ data: crmLifecycleStages }],
      }} options={{ cutout: "66%", plugins: { legend: { position: "bottom" } } }} />
      <DashboardChart type="bar" title="New leads" description="Qualified leads added each month" data={{
        labels: months, datasets: [{ label: "New leads", data: crmNewLeadTrend, borderRadius: 5 }],
      }} />
    </div>
    <DashboardTable title="Team pipeline" description="Lead assignments and next-touch tracking" columns={["Account", "Owner", "Stage", "Last contact", "Opportunity"]}
      rows={crmLeads.map((lead) => [<strong>{lead.name}</strong>, lead.owner, <Badge tone={statusTone(lead.stage)}>{lead.stage}</Badge>, lead.lastContact, lead.value])} />
  </DashboardPageFrame>;
}

export default CRMPlatform;
