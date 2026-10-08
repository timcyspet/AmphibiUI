import type { DashboardNavItem } from "./DashboardLayout.js";

export function Sidebar({ items, activePage, onNavigate }: { items: DashboardNavItem[]; activePage: string; onNavigate: (id: string) => void }) {
  return <aside className="aui-sidebar"><a className="aui-brand" href="#" onClick={(event) => event.preventDefault()}>Amphibi<span>UI</span></a><p className="aui-sidebar-label">WORKSPACE</p><nav aria-label="Main navigation">{items.map((item) => <button key={item.id} type="button" className={activePage === item.id ? "active" : ""} aria-current={activePage === item.id ? "page" : undefined} onClick={() => onNavigate(item.id)}><span aria-hidden="true">{item.icon ?? "◦"}</span>{item.label}</button>)}</nav><div className="aui-sidebar-footer">Built for teams<br /><small>AmphibiUI demo</small></div></aside>;
}
