import { Avatar, Breadcrumbs, Button } from "../Elements/index.js";

export interface HeaderProps {
  title: string;
  collapsible?: boolean;
  collapsed?: boolean;
  sidebarId?: string;
  onToggleSidebar?: () => void;
}

export function Header({
  title,
  collapsible = false,
  collapsed = false,
  sidebarId,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="aui-header">
      <div className="aui-header-heading">
        {collapsible && (
          <button
            type="button"
            className="aui-sidebar-toggle"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            aria-controls={sidebarId}
            onClick={onToggleSidebar}
          >
            <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          </button>
        )}
        <div><Breadcrumbs items={[{ label: "Workspace" }, { label: title }]} /><h1>{title}</h1></div>
      </div>
      <div className="aui-header-actions"><Button variant="secondary" aria-label="Search">⌕</Button><Button variant="secondary" aria-label="Notifications">♧</Button><Avatar name="Alex Morgan" size="sm" /></div>
    </header>
  );
}
