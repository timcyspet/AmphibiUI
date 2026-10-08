import { Avatar, Breadcrumbs, Button } from "../Elements/index.js";

export function Header({ title }: { title: string }) {
  return <header className="aui-header"><div><Breadcrumbs items={[{ label: "Workspace" }, { label: title }]} /><h1>{title}</h1></div><div className="aui-header-actions"><Button variant="secondary" aria-label="Search">⌕</Button><Button variant="secondary" aria-label="Notifications">♧</Button><Avatar name="Alex Morgan" size="sm" /></div></header>;
}
