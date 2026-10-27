import { useId, useState, type ReactNode } from "react";
import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar.js";

export interface DashboardNavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: DashboardNavItem[];
}

export interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  navItems: DashboardNavItem[];
  activePage: string;
  onNavigate: (id: string) => void;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function DashboardLayout({
  children,
  title,
  navItems,
  activePage,
  onNavigate,
  collapsible = true,
  defaultCollapsed = false,
  collapsed,
  onCollapsedChange,
}: DashboardLayoutProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const sidebarId = useId();
  const isCollapsed = collapsible && (collapsed ?? uncontrolledCollapsed);

  const toggleSidebar = () => {
    const nextCollapsed = !isCollapsed;
    if (collapsed === undefined) setUncontrolledCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
  };

  return (
    <div className="aui-dashboard" data-sidebar-collapsed={isCollapsed}>
      <Sidebar id={sidebarId} items={navItems} activePage={activePage} onNavigate={onNavigate} collapsed={isCollapsed} />
      <div className="aui-dashboard-main">
        <Header
          title={title}
          collapsible={collapsible}
          collapsed={isCollapsed}
          sidebarId={sidebarId}
          onToggleSidebar={toggleSidebar}
        />
        <main className="aui-page-content">{children}</main>
      </div>
    </div>
  );
}
