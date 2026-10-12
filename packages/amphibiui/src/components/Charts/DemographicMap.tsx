import {
  Chart as ChartJS,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import {
  BubbleMapController,
  GeoFeature,
  ProjectionScale,
  SizeScale,
  topojson,
} from "chartjs-chart-geo";
import worldTopology from "world-atlas/countries-110m.json";
import { Chart as ChartComponent } from "react-chartjs-2";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";
import { themeTokens } from "../../theme/tokens.js";

ChartJS.register(BubbleMapController, GeoFeature, ProjectionScale, SizeScale, Tooltip);
const projectionDefaults = ChartJS.overrides.bubbleMap.scales.projection;
if (projectionDefaults.type !== "projection") {
  throw new Error("The bubble map controller did not register its projection scale.");
}
projectionDefaults.projection = "equalEarth";

export interface DemographicLocation {
  name: string;
  longitude: number;
  latitude: number;
  customers: number;
  share: number;
}

type WorldTopology = Parameters<typeof topojson.feature>[0];
function isWorldTopology(value: unknown): value is WorldTopology {
  if (!value || typeof value !== "object") return false;
  const candidate = value as {
    type?: unknown;
    objects?: { countries?: unknown };
    arcs?: unknown;
    transform?: { scale?: unknown; translate?: unknown };
  };
  const transform = candidate.transform;
  const isCoordinatePair = (pair: unknown): pair is number[] =>
    Array.isArray(pair) && pair.length === 2 && pair.every((coordinate) => typeof coordinate === "number");
  const countries = candidate.objects?.countries;
  return candidate.type === "Topology"
    && Array.isArray(candidate.arcs)
    && isCoordinatePair(transform?.scale)
    && isCoordinatePair(transform?.translate)
    && Boolean(countries && typeof countries === "object" && "geometries" in countries
      && Array.isArray(countries.geometries));
}

const topologyAsset: unknown = worldTopology;
if (!isWorldTopology(topologyAsset)) {
  throw new Error("The bundled world map data is not a valid TopoJSON topology.");
}
const countryCollection = topojson.feature(topologyAsset, topologyAsset.objects.countries);
if (!("features" in countryCollection)) {
  throw new Error("The bundled world map does not contain a country feature collection.");
}
const countries = countryCollection.features;

export interface DemographicMapProps {
  locations: DemographicLocation[];
  title?: string;
  description?: string;
  height?: number;
  className?: string;
}

export function DemographicMap({
  locations,
  title = "Demographic map",
  description = "Customers by country",
  height = 240,
  className,
}: DemographicMapProps) {
  const { framework, theme } = useAmphibiUIOptional();
  const tokens = themeTokens[theme];
  const data: ChartData<"bubbleMap"> = {
    labels: locations.map((location) => location.name),
    datasets: [{
      label: "Customers",
      outline: countries,
      showOutline: true,
      outlineBackgroundColor: tokens.surfaceMuted,
      outlineBorderColor: tokens.surface,
      outlineBorderWidth: 0.7,
      backgroundColor: tokens.primary,
      borderColor: tokens.surface,
      borderWidth: 1.5,
      data: locations.map(({ longitude, latitude, customers }) => ({
        longitude,
        latitude,
        value: customers,
      })),
    }],
  };
  const options: ChartOptions<"bubbleMap"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const location = locations[context.dataIndex];
            return location
              ? `${location.name}: ${location.customers.toLocaleString()} customers`
              : "";
          },
        },
      },
    },
    scales: {
      size: { type: "size", axis: "x", display: false, range: [3, 10] as [number, number] },
    },
  };

  return (
    <section className={["aui-card", "aui-demographic-map", `aui-demographic-map-${framework}`, className].filter(Boolean).join(" ")}>
      <header className="aui-demographic-map-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </header>
      <div className="aui-demographic-map-content">
        <div
          className="aui-demographic-map-canvas"
          style={{ height }}
          role="img"
          aria-label="World map showing customer locations by country"
        >
          <ChartComponent type="bubbleMap" data={data} options={options} />
        </div>
        <ul className="aui-demographic-map-legend" aria-label="Customer share by country">
          {locations.map((location) => (
            <li key={location.name}>
              <div className="aui-demographic-map-country">
                <span className="aui-demographic-map-marker" aria-hidden="true" />
                <strong>{location.name}</strong>
              </div>
              <div className="aui-demographic-map-stats">
                <span>{location.customers.toLocaleString()} customers</span>
                <strong>{location.share}%</strong>
              </div>
              <div
                className="aui-demographic-map-progress"
                role="progressbar"
                aria-label={`${location.name} customer share`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={location.share}
              >
                <span style={{ width: `${location.share}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DemographicMap;
