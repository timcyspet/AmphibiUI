import { useEffect, useState } from "react";
import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { months, portfolioAssetShare, portfolioMetrics, portfolioValueTrend, stockWatchlist } from "./mockData.js";

export function StockPortfolioDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((current) => current + 1), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const quotes = stockWatchlist.map((stock, index) => {
    const price = Number(stock.price.replace("$", ""));
    const change = Number(stock.change.replace("%", ""));
    const nextPrice = price * (1 + Math.sin((tick + index * 2) / 3) * 0.001);
    const nextChange = change + Math.sin(tick + index) * 0.12;
    const liveValue = `$${(nextPrice * Number(stock.shares)).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    return { ...stock, livePrice: `$${nextPrice.toFixed(2)}`, liveChange: `${nextChange >= 0 ? "+" : ""}${nextChange.toFixed(2)}%`, liveValue };
  });

  return <DashboardPageFrame title="Portfolio overview" description="Track your investments, market movement, and asset allocation." action={<Button variant="secondary">＋ Add investment</Button>}>
    <MetricGrid items={portfolioMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="line" title="Portfolio performance" description="Account value · last six months" data={{
        labels: months, datasets: [{ label: "Portfolio", data: portfolioValueTrend, tension: 0.35, fill: true }],
      }} />
      <DashboardChart type="doughnut" title="Asset allocation" description="Portfolio share by asset class" data={{
        labels: ["US equities", "International", "Fixed income", "Cash"],
        datasets: [{ data: portfolioAssetShare }],
      }} options={{ cutout: "68%", plugins: { legend: { position: "bottom" } } }} />
    </div>
    <DashboardTable title="Watchlist" description="Mock market feed · quotes refresh every 5 seconds" columns={["Ticker", "Company", "Price", "Day change", "Shares", "Market value"]}
      rows={quotes.map((stock) => [<strong>{stock.ticker}</strong>, stock.company, stock.livePrice, <Badge tone={statusTone(stock.liveChange)}>{stock.liveChange}</Badge>, stock.shares, stock.liveValue])} />
  </DashboardPageFrame>;
}

export default StockPortfolioDashboard;
