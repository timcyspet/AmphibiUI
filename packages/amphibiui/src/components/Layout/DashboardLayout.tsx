import type { ReactNode } from "react";
import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar.js";

export interface DashboardNavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: DashboardNavItem[];
}
export function DashboardLayout({ children, title, navItems, activePage, onNavigate }: {
  children: ReactNode; title: string; navItems: DashboardNavItem[]; activePage: string; onNavigate: (id: string) => void;
}) {
  return <div className="aui-dashboard"><Sidebar items={navItems} activePage={activePage} onNavigate={onNavigate} /><div className="aui-dashboard-main"><Header title={title} /><main className="aui-page-content">{children}</main></div></div>;
}
