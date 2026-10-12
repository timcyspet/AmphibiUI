import { useState } from "react";
import {
  AmphibiUIProvider, ApplicationPage, DashboardLayout, pageCatalog,
  themeNames, type DashboardNavItem, type FrameworkName, type PageId, type ThemeName,
} from "amphibiui";

const navPage = (id: PageId, options: { icon?: boolean; label?: string; badge?: string } = {}): DashboardNavItem => {
  const page = pageCatalog.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown navigation page: ${id}`);
  return {
    id,
    label: options.label ?? page.label,
    icon: options.icon ? iconFor(id) : undefined,
    badge: options.badge,
  };
};

const navItems: DashboardNavItem[] = [
  { id: "dashboard-group", label: "Overview", icon: "▦", children: [navPage("dashboard", { label: "Analytics" }), navPage("data-tables"), navPage("pricing")] },
  { id: "dashboards-group", label: "Dashboards", icon: "▧", children: [
    navPage("logistics-dashboard"), navPage("ai-dashboard"), navPage("sales-dashboard"),
    navPage("finance-dashboard"), navPage("ecommerce-dashboard"), navPage("analytics-dashboard"),
    navPage("marketing-hub"), navPage("crm-platform"), navPage("stock-portfolio-dashboard"),
    navPage("saas-interface"), navPage("hr-system-dashboard"),
  ] },
  navPage("calendar", { icon: true, badge: "NEW" }),
  navPage("profile", { icon: true, label: "User Profile" }),
  { id: "applications-group", label: "Applications", icon: "▧", children: [navPage("mailbox"), navPage("chat"), navPage("teams"), navPage("files"), navPage("integrations", { badge: "NEW" })] },
  { id: "projects-group", label: "Tasks & Support", icon: "▤", children: [navPage("kanban"), navPage("tickets"), navPage("ticket-replies")] },
  { id: "settings-group", label: "Settings & Pages", icon: "☷", children: [navPage("form-elements"), navPage("settings"), navPage("faq"), navPage("api-keys"), navPage("terms"), navPage("blank"), navPage("not-found"), navPage("maintenance")] },
];

export function App() {
  const [framework, setFramework] = useState<FrameworkName>("tailwind");
  const [theme, setTheme] = useState<ThemeName>("sky-blue");
  const [page, setPage] = useState<PageId>("dashboard");
  const title = pageCatalog.find((item) => item.id === page)?.label ?? "Workspace";

  return <AmphibiUIProvider framework={framework} theme={theme}>
    <section className="dev-controls" aria-label="Developer controls">
      <strong>Dev Controls Panel</strong>
      <label>Framework<select value={framework} onChange={(event) => setFramework(event.target.value as FrameworkName)}><option value="tailwind">Tailwind CSS</option><option value="bootstrap">Bootstrap 5</option></select></label>
      <label>Theme<select value={theme} onChange={(event) => setTheme(event.target.value as ThemeName)}>{themeNames.map((name) => <option key={name} value={name}>{name.replace(/-/g, " ")}</option>)}</select></label>
      <span className="dev-current">Live preview · {framework} / {theme}</span>
    </section>
    <DashboardLayout title={title} navItems={navItems} activePage={page} onNavigate={(id) => setPage(id as PageId)}>
      <ApplicationPage key={page} page={page} onNavigate={setPage} />
    </DashboardLayout>
  </AmphibiUIProvider>;
}

function iconFor(id: string) {
  const icons: Record<string, string> = {
    dashboard: "▥", calendar: "▣", "data-tables": "▦", settings: "⚙", profile: "◉", faq: "?", pricing: "$", mailbox: "✉",
    chat: "☏", teams: "♙", terms: "≡", kanban: "▤", files: "▱", tickets: "◷",
    "ticket-replies": "↩", "api-keys": "⌘", integrations: "⌘", blank: "＋",
    "not-found": "!", maintenance: "⚒", "form-elements": "▤",
  };
  return icons[id] ?? "•";
}
