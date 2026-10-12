import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Responsive, useContainerWidth, type Layout, type LayoutItem, type ResponsiveLayouts } from "react-grid-layout";
import { Button } from "../Elements/index.js";

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 } as const;
const columns = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } as const;

export interface DashboardGridWidget {
  id: string;
  label: string;
  content: ReactNode;
  defaultWidth?: "full" | "half";
  defaultHeight?: number;
}

export interface DashboardGridProps {
  dashboardId: string;
  widgets: DashboardGridWidget[];
}

export function DashboardGrid({ dashboardId, widgets }: DashboardGridProps) {
  const storageKey = `amphibiui:dashboard-grid:v1:${dashboardId}`;
  const signature = JSON.stringify(widgets.map(({ id, defaultWidth, defaultHeight }) => [id, defaultWidth, defaultHeight]));
  const defaultLayouts = useMemo(() => createDefaultLayouts(widgets), [signature]);
  const [layouts, setLayouts] = useState(() => readLayouts(storageKey, defaultLayouts));
  const layoutsRef = useRef(layouts);
  const { width, containerRef, mounted } = useContainerWidth({ initialWidth: 1200 });

  const updateLayouts = useCallback((_layout: Layout, nextLayouts: ResponsiveLayouts) => {
    const mergedLayouts = { ...layoutsRef.current, ...nextLayouts };
    if (sameLayouts(layoutsRef.current, mergedLayouts)) return;
    layoutsRef.current = mergedLayouts;
    setLayouts(mergedLayouts);
    writeLayouts(storageKey, mergedLayouts);
  }, [storageKey]);

  const resetLayout = useCallback(() => {
    const resetLayouts = createDefaultLayouts(widgets);
    layoutsRef.current = resetLayouts;
    setLayouts(resetLayouts);
    writeLayouts(storageKey, resetLayouts);
  }, [storageKey, signature]);

  return (
    <section className="aui-dashboard-grid" aria-label={`${dashboardId} dashboard widgets`}>
      <div className="aui-dashboard-grid-toolbar">
        <p>Drag widgets by their handles and resize from the lower-right corner. Layouts are saved on this device.</p>
        <Button variant="secondary" onClick={resetLayout}>Reset layout</Button>
      </div>
      <div ref={containerRef} className="aui-dashboard-grid-container">
        {mounted && (
          <Responsive
            className="aui-dashboard-grid-layout"
            width={width}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={columns}
            rowHeight={24}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            dragConfig={{ enabled: true, bounded: true, handle: ".aui-dashboard-grid-handle", allowMobileScroll: true }}
            resizeConfig={{ enabled: true, handles: ["se"] }}
            onLayoutChange={updateLayouts}
          >
            {widgets.map((widget) => (
              <div className="aui-dashboard-grid-item" key={widget.id}>
                <div className="aui-dashboard-grid-widget">
                  <div className="aui-dashboard-grid-widget-toolbar">
                    <span className="aui-dashboard-grid-handle" aria-hidden="true" title={`Drag ${widget.label}`}>⠿</span>
                    <span>{widget.label}</span>
                  </div>
                  <div className="aui-dashboard-grid-widget-content">{widget.content}</div>
                </div>
              </div>
            ))}
          </Responsive>
        )}
      </div>
    </section>
  );
}

function createDefaultLayouts(widgets: DashboardGridWidget[]): ResponsiveLayouts {
  const result: ResponsiveLayouts = {};

  for (const breakpoint of Object.keys(columns) as Array<keyof typeof columns>) {
    const columnCount = columns[breakpoint];
    let x = 0;
    let y = 0;
    let rowHeight = 0;
    const layout: LayoutItem[] = [];

    for (const widget of widgets) {
      const w = widget.defaultWidth === "half" && columnCount > 6
        ? Math.floor(columnCount / 2)
        : columnCount;
      const h = widget.defaultHeight ?? 10;
      if (x > 0 && x + w > columnCount) {
        x = 0;
        y += rowHeight;
        rowHeight = 0;
      }

      layout.push({ i: widget.id, x, y, w, h, minW: 1, minH: 5 });
      x += w;
      rowHeight = Math.max(rowHeight, h);
      if (x >= columnCount) {
        x = 0;
        y += rowHeight;
        rowHeight = 0;
      }
    }

    result[breakpoint] = layout;
  }

  return result;
}

function readLayouts(
  storageKey: string,
  defaults: ResponsiveLayouts,
): ResponsiveLayouts {
  if (typeof window === "undefined") return defaults;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return defaults;

    const parsed: unknown = JSON.parse(stored);
    if (!isRecord(parsed)) return defaults;

    const result: ResponsiveLayouts = {};
    for (const breakpoint of Object.keys(columns) as Array<keyof typeof columns>) {
      const baseLayout = defaults[breakpoint] ?? [];
      const savedLayout = parsed[breakpoint];
      const savedItems = Array.isArray(savedLayout) ? savedLayout.filter(isLayoutItem) : [];
      const columnCount = columns[breakpoint];

      result[breakpoint] = baseLayout.map((baseItem) => {
        const savedItem = savedItems.find((item) => item.i === baseItem.i);
        if (!savedItem) return baseItem;

        const w = clamp(Math.round(savedItem.w), 1, columnCount);
        return {
          ...baseItem,
          x: clamp(Math.round(savedItem.x), 0, columnCount - w),
          y: clamp(Math.round(savedItem.y), 0, 100),
          w,
          h: clamp(Math.round(savedItem.h), baseItem.minH ?? 5, 48),
        };
      });
    }

    return result;
  } catch (error) {
    console.error(`AmphibiUI could not read the saved dashboard layout "${storageKey}".`, error);
    return defaults;
  }
}

function writeLayouts(storageKey: string, layouts: ResponsiveLayouts) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(layouts));
  } catch (error) {
    console.error(`AmphibiUI could not save the dashboard layout "${storageKey}".`, error);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLayoutItem(value: unknown): value is LayoutItem {
  if (!isRecord(value)) return false;
  return typeof value.i === "string"
    && ["x", "y", "w", "h"].every((key) => typeof value[key] === "number" && Number.isFinite(value[key]));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function sameLayouts(first: ResponsiveLayouts, second: ResponsiveLayouts) {
  const breakpointNames = new Set([...Object.keys(first), ...Object.keys(second)]);
  for (const breakpoint of breakpointNames) {
    const firstLayout = first[breakpoint] ?? [];
    const secondLayout = second[breakpoint] ?? [];
    if (firstLayout.length !== secondLayout.length) return false;

    for (const item of firstLayout) {
      const next = secondLayout.find((candidate) => candidate.i === item.i);
      if (!next || next.x !== item.x || next.y !== item.y || next.w !== item.w || next.h !== item.h) return false;
    }
  }

  return true;
}
