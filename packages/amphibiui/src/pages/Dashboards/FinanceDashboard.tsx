import { Badge, Button, Card, Progressbar } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { financeCashFlow, financeMetrics, financeSpendAllocation, financeTransactions, months } from "./mockData.js";

export function FinanceDashboard() {
  return <DashboardPageFrame title="Finance overview" description="Review cash flow, corporate spending, and recent transactions." action={<Button variant="secondary">Download statement</Button>}>
    <MetricGrid items={financeMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="line" title="Cash flow" description="Income and expenses · USD" data={{
        labels: months,
        datasets: financeCashFlow.map((series) => ({ ...series, tension: 0.35 })),
      }} />
      <DashboardChart type="doughnut" title="Spend allocation" description="Corporate card spend by category" data={{
        labels: ["Infrastructure", "Travel", "Software", "Operations"],
        datasets: [{ data: financeSpendAllocation }],
      }} options={{ cutout: "66%", plugins: { legend: { position: "bottom" } } }} />
    </div>
    <Card><div className="aui-page-intro"><div><h3>Balance sheet & card controls</h3><p>Current period snapshot · USD</p></div><Badge tone="success">Balanced</Badge></div>
      <div className="aui-variant-balance-sheet"><div><span>Total assets</span><strong>$1,284,600</strong></div><div><span>Liabilities</span><strong>$442,800</strong></div><div><span>Shareholder equity</span><strong>$841,800</strong></div></div>
      <Progressbar label="Corporate cards · $28,640 of $42,000" value={68} />
    </Card>
    <DashboardTable title="Transaction ledger" columns={["Date", "Merchant", "Category", "Amount", "Status"]}
      rows={financeTransactions.map((transaction) => [transaction.date, <strong>{transaction.merchant}</strong>, transaction.category, transaction.amount, <Badge tone={statusTone(transaction.status)}>{transaction.status}</Badge>])} />
  </DashboardPageFrame>;
}

export default FinanceDashboard;
