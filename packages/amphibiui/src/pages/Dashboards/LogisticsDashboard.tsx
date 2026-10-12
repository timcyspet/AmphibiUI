import { Badge, Button, Card, Progressbar } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { logisticsDeliveries, logisticsDeliveryTrend, logisticsMetrics, logisticsRouteEfficiency, months } from "./mockData.js";

export function LogisticsDashboard() {
  return <DashboardPageFrame title="Logistics overview" description="Monitor deliveries, fleet health, and network efficiency." action={<Button variant="secondary">Export report</Button>}>
    <MetricGrid items={logisticsMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="line" title="Delivery volume" description="Completed shipments by month" data={{
        labels: months, datasets: [{ label: "Delivered", data: logisticsDeliveryTrend, tension: 0.35 }],
      }} />
      <Card><h3>Route efficiency</h3><p>Network performance against target</p>
        {logisticsRouteEfficiency.map((route) => <Progressbar key={route.label} label={route.label} value={route.value} />)}
      </Card>
    </div>
    <DashboardTable title="Live deliveries" description="Latest shipment status across your network" columns={["Shipment", "Destination", "Carrier", "Route", "ETA", "Status"]}
      rows={logisticsDeliveries.map((delivery) => [<strong>{delivery.id}</strong>, delivery.destination, delivery.carrier, delivery.route, delivery.eta, <Badge tone={statusTone(delivery.status)}>{delivery.status}</Badge>])} />
  </DashboardPageFrame>;
}

export default LogisticsDashboard;
