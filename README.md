# AmphibiUI

AmphibiUI is a React and TypeScript dashboard component library with a sample
playground. The workspace uses Yarn 4 because the sample app consumes the
library through the `workspace:*` dependency protocol.

## Getting started

Using npm:

```sh
npm install
npm run dev:npm
```

Using Yarn:

```sh
corepack yarn install
corepack yarn dev
```

The sample app is available at the Vite URL printed in the terminal. Use the
Dev Controls Panel to switch between Tailwind CSS and Bootstrap 5, and between
the eight included themes. Navigation state is kept while changing either
setting.

## Build and typecheck

```sh
corepack yarn build
corepack yarn typecheck
```

With npm, use `npm run build:npm` and `npm run typecheck:npm`.

The `amphibiui` package exports components and types from `src/index.ts` and
ships its design-system CSS as `amphibiui/styles.css`. Consumers should load
that stylesheet and the stylesheet for their selected framework.

## Library usage

```tsx
import { AmphibiUIProvider, Button, Card, DashboardChart } from "amphibiui";
import "amphibiui/styles.css";

export function Example() {
  return (
    <AmphibiUIProvider framework="tailwind" theme="sky-blue">
      <Card>
        <Button>Continue</Button>
        <DashboardChart
          type="line"
          title="Monthly revenue"
          data={{
            labels: ["May", "Jun", "Jul", "Aug"],
            datasets: [{
              label: "Revenue",
              data: [28000, 32000, 30500, 39000],
              borderColor: "#00a3ff",
              tension: 0.35,
            }],
          }}
        />
      </Card>
    </AmphibiUIProvider>
  );
}
```

The provider accepts controlled `framework` and `theme` values. Pass state
setter callbacks through `setFramework` and `setTheme` when the application
needs to expose runtime controls. `DashboardChart` supports `bar`, `line`, and
`doughnut` charts; its axes, labels, and tooltips follow the active theme. The
sample app opens on an Analytics Dashboard demonstrating all three chart types.
The reusable `DemographicMap` combines a locally bundled world map with
theme-aware customer markers and a country-share legend; provide location
records with longitude, latitude, customer count, and share percentage.

`AmphibiCalendar` wraps FullCalendar with month, week, day, and list views. It
accepts FullCalendar options such as `events`, `selectable`, `editable`, and
`eventClick`; its colors follow the active theme, and the Bootstrap framework
uses FullCalendar's Bootstrap 5 theme. When using Bootstrap, consumers should
load Bootstrap 5 CSS in their application.

```tsx
import { AmphibiCalendar } from "amphibiui";

<AmphibiCalendar
  title="Team calendar"
  initialView="dayGridMonth"
  events={[{ title: "Planning", start: "2026-10-15T10:00:00" }]}
  selectable
  editable
/>;
```

`RichTextEditor` is a Lexical-based editor with block styles, headings, bold,
italic, underline, strikethrough, inline code, lists, links, quotes, code
blocks, horizontal rules, undo, and redo. It follows the active framework and
theme, supports disabled mode, and can emit serialized Lexical editor state
with `onChange`. Pass `initialValue` as a serialized Lexical editor state; it
is used when the editor mounts.

```tsx
import { RichTextEditor } from "amphibiui";

<RichTextEditor
  ariaLabel="Article body"
  placeholder="Write your article..."
  onChange={(serializedState) => saveDraft(serializedState)}
/>;
```

`AmphibiIcon` wraps Font Awesome's SVG React component and inherits the current
text color. AmphibiUI exports common solid icons including `faBell`,
`faCalendarDays`, `faChartLine`, `faCheck`, `faEnvelope`, `faGear`,
`faMagnifyingGlass`, `faUser`, and `faWandMagicSparkles`. Import other icon
definitions from `@fortawesome/free-solid-svg-icons`.

`AmphibiSelect` wraps React Select with the active theme and framework applied,
while retaining React Select's search, async, and single- or multi-select
features. Pass its `styles` prop to customize or extend the default theme.
Both integrations are demonstrated on the Form Elements page.

```tsx
import { useState } from "react";
import { AmphibiIcon, AmphibiSelect, faBell } from "amphibiui";

function Example() {
  const options = [
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
  ];
  const [selected, setSelected] = useState([options[0]]);

  return (
    <>
      <AmphibiIcon icon={faBell} aria-label="Notifications" />
      <AmphibiSelect
        options={options}
        value={selected}
        onChange={(value) => setSelected([...value])}
        isMulti
      />
    </>
  );
}
```

`TabulatorDataTable` wraps Tabulator with local sorting, pagination, and movable
columns. It inherits the active theme tokens and switches its visual treatment
with the provider framework. The sample app's Data Tables page lets you switch
between the existing AmphibiUI table and the Tabulator implementation.

```tsx
import { TabulatorDataTable } from "amphibiui";

<TabulatorDataTable
  data={[{ name: "Olivia Rhye", role: "Designer" }]}
  columns={[
    { title: "Name", field: "name", sorter: "string" },
    { title: "Role", field: "role", sorter: "string" },
  ]}
/>;
```

The sample app's **Dashboards** menu demonstrates the 11 exported industry
templates: `LogisticsDashboard`, `AIDashboard`, `SalesDashboard`,
`FinanceDashboard`, `ECommerceDashboard`, `AnalyticsDashboard`, `MarketingHub`,
`CRMPlatform`, `StockPortfolioDashboard`, `SaaSInterface`, and
`HRSystemDashboard`. They are content templates designed to render inside
`DashboardLayout`; all included records and metrics are illustrative mock data.
Dashboard tables, cards, spacing, typography, and chart palettes respond to
the active framework and theme. The **Form Elements** page in the
**Settings & Pages** menu demonstrates themed inputs, groups, selection
controls, toggles, file inputs, and drag-and-drop upload.
The Form Elements page also demonstrates theme-aware React Select controls
and a Font Awesome icon reference table with previews, icon names, and use
cases.

Dashboard sections use the exported `DashboardGrid` powered by
`react-grid-layout`. Define widgets with the exported `DashboardGridWidget`
type; `content` can be any React node, and `defaultWidth` and `defaultHeight`
set the initial size. Users can drag widgets by their handles, resize them, and
restore the defaults with **Reset layout**. Responsive layouts are saved per
dashboard in local storage using `dashboardId`.

```tsx
import { Card, DashboardGrid, type DashboardGridWidget } from "amphibiui";

const widgets: DashboardGridWidget[] = [
  {
    id: "summary",
    label: "Summary",
    defaultWidth: "half",
    defaultHeight: 12,
    content: <Card><h2>$48,250</h2><p>Monthly revenue</p></Card>,
  },
  {
    id: "orders",
    label: "Orders",
    defaultWidth: "half",
    defaultHeight: 12,
    content: <Card><h2>1,284</h2><p>Orders received</p></Card>,
  },
];

<DashboardGrid dashboardId="revenue" widgets={widgets} />;
```

## License

AmphibiUI is licensed under the [MIT License](./LICENSE).
