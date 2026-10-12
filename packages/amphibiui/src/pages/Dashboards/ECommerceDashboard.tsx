import { Badge, Progressbar } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { ecommerceFunnel, ecommerceMetrics, ecommerceProducts, ecommerceRetentionTrend, months } from "./mockData.js";

export function ECommerceDashboard() {
  return <DashboardPageFrame title="E-commerce overview" description="Understand storefront conversion, customer retention, and inventory health.">
    <MetricGrid items={ecommerceMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="bar" title="Shopping funnel" description="Sessions reaching each purchase stage" data={{
        labels: ["Store visits", "Product views", "Add to cart", "Checkout", "Purchased"],
        datasets: [{ label: "Visitors", data: ecommerceFunnel, borderRadius: 5 }],
      }} />
      <DashboardChart type="line" title="Repeat purchase rate" description="Returning customer share" data={{
        labels: months, datasets: [{ label: "Repeat customers", data: ecommerceRetentionTrend, tension: 0.35 }],
      }} />
    </div>
    <div className="aui-variant-grid-2">
      <DashboardTable title="Product inventory" columns={["SKU", "Product", "Category", "Stock", "Units sold", "Status"]}
        rows={ecommerceProducts.map((product) => [<strong>{product.sku}</strong>, product.product, product.category, product.stock, product.sold, <Badge tone={statusTone(product.status)}>{product.status}</Badge>])} />
      <div className="aui-stack">
        <Progressbar label="Inventory health · 82%" value={82} />
        <Progressbar label="Orders fulfilled today · 76%" value={76} />
      </div>
    </div>
  </DashboardPageFrame>;
}

export default ECommerceDashboard;
