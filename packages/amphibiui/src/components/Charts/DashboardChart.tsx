import type { ReactNode } from "react";
import {
  ArcElement, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement,
  LinearScale, PointElement, Tooltip, type ChartData, type ChartOptions,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";
import { themeTokens, type ThemeTokens } from "../../theme/tokens.js";

ChartJS.register(
  ArcElement, BarElement, CategoryScale, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip,
);

interface DashboardChartBaseProps {
  title: string;
  description?: string;
  height?: number;
  className?: string;
}

export type DashboardChartProps = DashboardChartBaseProps & (
  | { type: "bar"; data: ChartData<"bar">; options?: ChartOptions<"bar"> }
  | { type: "line"; data: ChartData<"line">; options?: ChartOptions<"line"> }
  | { type: "doughnut"; data: ChartData<"doughnut">; options?: ChartOptions<"doughnut"> }
);

function commonOptions(tokens: ThemeTokens) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    color: tokens.textMuted,
    plugins: {
      legend: { labels: { color: tokens.textMuted } },
      tooltip: {
        backgroundColor: tokens.surface,
        titleColor: tokens.text,
        bodyColor: tokens.text,
        borderColor: tokens.border,
        borderWidth: 1,
      },
    },
  };
}

function cartesianScales(tokens: ThemeTokens) {
  return {
    x: { grid: { color: tokens.border }, ticks: { color: tokens.textMuted } },
    y: { grid: { color: tokens.border }, ticks: { color: tokens.textMuted } },
  };
}

function renderChart(props: DashboardChartProps, tokens: ThemeTokens): ReactNode {
  const base = commonOptions(tokens);
  const palette = [tokens.primary, tokens.accent, tokens.success, tokens.danger, tokens.border];
  if (props.type === "bar") {
    const data: ChartData<"bar"> = {
      ...props.data,
      datasets: props.data.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor ?? palette[index % palette.length],
        borderColor: dataset.borderColor ?? palette[index % palette.length],
      })),
    };
    const options: ChartOptions<"bar"> = {
      ...base,
      ...props.options,
      plugins: { ...base.plugins, ...props.options?.plugins },
      scales: { ...cartesianScales(tokens), ...props.options?.scales },
    };
    return <Bar data={data} options={options} />;
  }
  if (props.type === "line") {
    const data: ChartData<"line"> = {
      ...props.data,
      datasets: props.data.datasets.map((dataset, index) => ({
        ...dataset,
        borderColor: dataset.borderColor ?? palette[index % palette.length],
        backgroundColor: dataset.backgroundColor ?? `${palette[index % palette.length]}22`,
        pointBackgroundColor: dataset.pointBackgroundColor ?? palette[index % palette.length],
      })),
    };
    const options: ChartOptions<"line"> = {
      ...base,
      ...props.options,
      plugins: { ...base.plugins, ...props.options?.plugins },
      scales: { ...cartesianScales(tokens), ...props.options?.scales },
    };
    return <Line data={data} options={options} />;
  }

  const data: ChartData<"doughnut"> = {
    ...props.data,
    datasets: props.data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor ?? dataset.data.map((_, index) => palette[index % palette.length]),
      borderColor: dataset.borderColor ?? tokens.surface,
    })),
  };
  const options: ChartOptions<"doughnut"> = {
    ...base,
    ...props.options,
    plugins: { ...base.plugins, ...props.options?.plugins },
  };
  return <Doughnut data={data} options={options} />;
}

export function DashboardChart(props: DashboardChartProps) {
  const { theme } = useAmphibiUIOptional();
  const tokens = themeTokens[theme];

  return (
    <section className={["aui-card", "aui-dashboard-chart", props.className].filter(Boolean).join(" ")}>
      <header>
        <div>
          <h3>{props.title}</h3>
          {props.description && <p>{props.description}</p>}
        </div>
      </header>
      <div className="aui-dashboard-chart-canvas" style={{ height: props.height ?? 280 }} role="img" aria-label={`${props.title} chart`}>
        {renderChart(props, tokens)}
      </div>
    </section>
  );
}
