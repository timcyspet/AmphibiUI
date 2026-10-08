import { useState } from "react";
import {
  AmphibiUIProvider, ApplicationPage, DashboardLayout, pageCatalog,
  themeNames, type FrameworkName, type PageId, type ThemeName,
} from "amphibiui";

export function App() {
  const [framework, setFramework] = useState<FrameworkName>("tailwind");
  const [theme, setTheme] = useState<ThemeName>("sky-blue");
  const [page, setPage] = useState<PageId>("data-tables");
  const title = pageCatalog.find((item) => item.id === page)?.label ?? "Workspace";

  return <AmphibiUIProvider framework={framework} theme={theme}>
    <section className="dev-controls" aria-label="Developer controls">
      <strong>Dev Controls Panel</strong>
      <label>Framework<select value={framework} onChange={(event) => setFramework(event.target.value as FrameworkName)}><option value="tailwind">Tailwind CSS</option><option value="bootstrap">Bootstrap 5</option></select></label>
      <label>Theme<select value={theme} onChange={(event) => setTheme(event.target.value as ThemeName)}>{themeNames.map((name) => <option key={name} value={name}>{name.replace(/-/g, " ")}</option>)}</select></label>
      <span className="dev-current">Live preview · {framework} / {theme}</span>
    </section>
    <DashboardLayout title={title} navItems={pageCatalog.map(({ id, label }) => ({ id, label, icon: iconFor(id) }))} activePage={page} onNavigate={(id) => setPage(id as PageId)}>
      <ApplicationPage key={page} page={page} onNavigate={setPage} />
    </DashboardLayout>
  </AmphibiUIProvider>;
}

function iconFor(id: string) {
  const icons: Record<string, string> = {
    "data-tables": "▦", settings: "⚙", profile: "◉", faq: "?", pricing: "$", mailbox: "✉",
    chat: "☏", teams: "♙", terms: "≡", kanban: "▤", files: "▱", tickets: "◷",
    "ticket-replies": "↩", "api-keys": "⌘", integrations: "⌘", blank: "＋",
    "not-found": "!", maintenance: "⚒",
  };
  return icons[id] ?? "•";
}
