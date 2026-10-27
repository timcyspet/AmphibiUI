import { useId, useState } from "react";
import type { DashboardNavItem } from "./DashboardLayout.js";

export interface SidebarProps {
  items: DashboardNavItem[];
  activePage: string;
  onNavigate: (id: string) => void;
  collapsed?: boolean;
  id?: string;
}

export function Sidebar({ items, activePage, onNavigate, collapsed = false, id }: SidebarProps) {
  const activeGroup = items.find((item) => item.children?.some((child) => child.id === activePage))?.id;
  const [expandedGroup, setExpandedGroup] = useState<string | null | undefined>();
  const sidebarPrefix = useId();

  return <aside id={id} className="aui-sidebar" data-collapsed={collapsed} aria-label="Sidebar"><a className="aui-brand" href="#" aria-label="AmphibiUI home" title={collapsed ? "AmphibiUI" : undefined} onClick={(event) => event.preventDefault()}>Amphibi<span>UI</span></a><p className="aui-sidebar-label">WORKSPACE</p><nav aria-label="Main navigation">{items.map((item) => {
    if (!item.children?.length) {
      return <button key={item.id} type="button" className="aui-nav-link" aria-label={collapsed ? item.label : undefined} title={collapsed ? item.label : undefined} aria-current={activePage === item.id ? "page" : undefined} onClick={() => onNavigate(item.id)}><span className="aui-nav-icon" aria-hidden="true">{item.icon ?? "◦"}</span><span className="aui-nav-label">{item.label}</span>{item.badge && <span className="aui-nav-badge">{item.badge}</span>}</button>;
    }

    const isExpanded = expandedGroup === undefined ? activeGroup === item.id : expandedGroup === item.id;
    const hasActiveChild = item.children.some((child) => child.id === activePage);
    const submenuId = `${sidebarPrefix}-aui-nav-${item.id}`;
    return <div className="aui-nav-group" key={item.id}>
      <button type="button" className={`aui-nav-toggle${hasActiveChild ? " active" : ""}`} aria-label={collapsed ? item.label : undefined} title={collapsed ? item.label : undefined} aria-expanded={isExpanded} aria-controls={submenuId} onClick={() => setExpandedGroup((current) => (current === undefined ? activeGroup : current) === item.id ? null : item.id)}>
        <span className="aui-nav-icon" aria-hidden="true">{item.icon ?? "◦"}</span><span className="aui-nav-label">{item.label}</span>{item.badge && <span className="aui-nav-badge">{item.badge}</span>}<span className={`aui-nav-chevron${isExpanded ? " expanded" : ""}`} aria-hidden="true">⌄</span>
      </button>
      <div id={submenuId} className="aui-nav-submenu" role="group" aria-label={`${item.label} pages`} hidden={!isExpanded}>
        {item.children.map((child) => <button key={child.id} type="button" className={activePage === child.id ? "active" : ""} aria-current={activePage === child.id ? "page" : undefined} onClick={() => onNavigate(child.id)}>
          {child.icon && <span className="aui-nav-icon" aria-hidden="true">{child.icon}</span>}<span className="aui-nav-label">{child.label}</span>{child.badge && <span className="aui-nav-badge">{child.badge}</span>}
        </button>)}
      </div>
    </div>;
  })}</nav><div className="aui-sidebar-footer">Built for teams<br /><small>AmphibiUI demo</small></div></aside>;
}
