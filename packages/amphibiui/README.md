# AmphibiUI

AmphibiUI is a React and TypeScript component library for dashboards and
administrative interfaces. Its components adapt to a selected framework and
theme through `AmphibiUIProvider`.

## Install

```sh
npm install amphibiui
```

React and React DOM 18 or 19 are peer dependencies. Import AmphibiUI's styles
once in your application. Bootstrap 5 CSS is only needed when using
`framework="bootstrap"`.

```tsx
import "amphibiui/styles.css";
```

When using Bootstrap framework mode, install Bootstrap in your application
and import its stylesheet:

```sh
npm install bootstrap
```

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```

## Quick start

```tsx
import {
  AmphibiUIProvider,
  Button,
  Card,
  RichTextEditor,
} from "amphibiui";
import "amphibiui/styles.css";

export function App() {
  return (
    <AmphibiUIProvider framework="tailwind" theme="sky-blue">
      <Card>
        <RichTextEditor
          ariaLabel="Article body"
          placeholder="Write your article..."
          onChange={(serializedState) => {
            window.localStorage.setItem("article-draft", serializedState);
          }}
        />
        <Button>Save</Button>
      </Card>
    </AmphibiUIProvider>
  );
}
```

`framework` accepts `"tailwind"` or `"bootstrap"`. Available themes are
`"dark"`, `"sky-blue"`, `"natural-green"`, `"midnight-cyber"`,
`"sunset-warmth"`, `"clinical-clean"`, `"nordic-minimal"`, and
`"high-contrast"`.

## Icons and enhanced selects

`AmphibiIcon` renders Font Awesome SVG icons with inherited text color. The
package re-exports `faBell`, `faCalendarDays`, `faChartLine`, `faCheck`,
`faEnvelope`, `faGear`, `faMagnifyingGlass`, `faUser`, and
`faWandMagicSparkles` from Font Awesome Free Solid. Import other icon
definitions from `@fortawesome/free-solid-svg-icons`.

`AmphibiSelect` wraps React Select. It retains React Select's search, clear,
multi-select, async, and accessibility props while applying the active
AmphibiUI theme and framework. Pass React Select's `styles` prop to customize
or extend its styles. Both integrations are shown on the sample Form Elements
page, which includes searchable single- and multi-select examples plus an
icon reference table showing previews, exported names, and suggested use cases.

```tsx
import {
  AmphibiIcon,
  AmphibiSelect,
  faBell,
} from "amphibiui";
import { useState } from "react";

function DepartmentPicker() {
  const options = [
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
  ];
  const [departments, setDepartments] = useState([options[0]]);

  return (
    <>
      <AmphibiIcon icon={faBell} aria-label="Notifications" />
      <AmphibiSelect
        inputId="departments"
        aria-label="Departments"
        options={options}
        value={departments}
        onChange={(selected) => setDepartments([...selected])}
        isMulti
        closeMenuOnSelect={false}
      />
    </>
  );
}
```

## Rich text editor

`RichTextEditor` uses Lexical and provides paragraph and heading styles, quote
and code blocks, bold, italic, underline, strikethrough, inline code, subscript,
superscript, ordered and unordered lists, links, horizontal rules, undo, and
redo. Link URLs are restricted to HTTP(S), `mailto:`, and `tel:` protocols.

`onChange` receives serialized Lexical editor state as a JSON string. Pass a
previously serialized state through `initialValue` to initialize the editor;
the value is read on mount.

## Dashboards and other components

The package also exports:

- `DashboardLayout`, `Sidebar`, `Header`, and `DashboardGrid`
- `DashboardChart` and `DemographicMap`
- `AmphibiCalendar` and `TabulatorDataTable`
- Atomic UI elements including `Alert`, `Avatar`, `Badge`, `Button`, `Card`,
  `Modal`, `Pagination`, `Tabs`, `Tooltip`, and `Video`
- Dashboard templates including `AnalyticsDashboard`, `SalesDashboard`,
  `FinanceDashboard`, `LogisticsDashboard`, `AIDashboard`, and the other
  industry dashboards
- `ApplicationPage`, `FormElementsPage`, `DataTablesPage`, `SettingsPage`, and
  `pageCatalog`

`DashboardGrid` supports drag and resize, responsive breakpoints, and
per-dashboard layout persistence in local storage. Define each item as a
`DashboardGridWidget`: `id` must be unique within the grid, `label` appears in
the widget toolbar, and `content` accepts any React node. `defaultWidth` can be
`"full"` or `"half"` and `defaultHeight` sets the initial height in grid rows.
Users can adjust the layout afterward, and it is saved in local storage under
the supplied `dashboardId`.

```tsx
import { useState } from "react";
import { Card, DashboardGrid, type DashboardGridWidget } from "amphibiui";

export function RevenueDashboard() {
  const [period, setPeriod] = useState("This month");
  const widgets: DashboardGridWidget[] = [
    {
      id: "revenue",
      label: "Revenue",
      defaultWidth: "half",
      defaultHeight: 12,
      content: (
        <Card>
          <h2>$48,250</h2>
          <p>Revenue for {period.toLowerCase()}</p>
        </Card>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      defaultWidth: "half",
      defaultHeight: 12,
      content: (
        <Card>
          <h2>1,284</h2>
          <p>Orders received</p>
        </Card>
      ),
    },
    {
      id: "period",
      label: "Reporting period",
      defaultHeight: 8,
      content: (
        <Card>
          <label>
            Period{" "}
            <select value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option>This month</option>
              <option>Last month</option>
            </select>
          </label>
        </Card>
      ),
    },
  ];

  return <DashboardGrid dashboardId="revenue" widgets={widgets} />;
}
```

`AmphibiCalendar` wraps FullCalendar, and `TabulatorDataTable` wraps
Tabulator.

See the [AmphibiUI repository README](https://github.com/timcyspet/AmphibiUI#readme)
for the sample app, additional examples, and workspace development commands.

## License

AmphibiUI is licensed under the [MIT License](./LICENSE).
