import { lazy, Suspense, useMemo, useState } from "react";
import { Alert, Avatar, Badge, Button, Card, List, Modal, Pagination, Progressbar, Tabs } from "../components/Elements/index.js";
import { DashboardChart } from "../components/Charts/DashboardChart.js";
import { useAmphibiUI } from "../context/AmphibiUIContext.js";
import { themeTokens } from "../theme/tokens.js";
import type { ColumnDefinition } from "tabulator-tables";
import type { DashboardGridWidget } from "../components/Layout/DashboardGrid.js";

const CalendarPage = lazy(() => import("./CalendarPage.js"));
const FormElementsPage = lazy(() => import("./FormElementsPage.js"));
const TabulatorDataTable = lazy(() => import("../components/DataTable/TabulatorDataTable.js")
  .then(({ TabulatorDataTable: Component }) => ({ default: Component })));
const DashboardGrid = lazy(() => import("../components/Layout/DashboardGrid.js")
  .then(({ DashboardGrid: Component }) => ({ default: Component })));

export const pageCatalog = [
  { id: "dashboard", label: "Dashboard" }, { id: "calendar", label: "Calendar" }, { id: "data-tables", label: "Data Tables" },
  { id: "form-elements", label: "Form Elements" }, { id: "settings", label: "Settings" },
  { id: "profile", label: "Profile" }, { id: "faq", label: "FAQ" }, { id: "pricing", label: "Pricing" },
  { id: "logistics-dashboard", label: "Logistics Dashboard" }, { id: "ai-dashboard", label: "AI Dashboard" },
  { id: "sales-dashboard", label: "Sales Dashboard" }, { id: "finance-dashboard", label: "Finance Dashboard" },
  { id: "ecommerce-dashboard", label: "E-Commerce Dashboard" }, { id: "analytics-dashboard", label: "Analytics Dashboard" },
  { id: "marketing-hub", label: "Marketing Hub" }, { id: "crm-platform", label: "CRM Platform" },
  { id: "stock-portfolio-dashboard", label: "Stock Portfolio" }, { id: "saas-interface", label: "SaaS Interface" },
  { id: "hr-system-dashboard", label: "HR System Dashboard" },
  { id: "mailbox", label: "Mailbox" }, { id: "chat", label: "Chat" }, { id: "teams", label: "Teams" },
  { id: "terms", label: "Terms & Conditions" }, { id: "kanban", label: "Kanban" },
  { id: "files", label: "File Manager" }, { id: "tickets", label: "Support Tickets" },
  { id: "ticket-replies", label: "Ticket Replies" }, { id: "api-keys", label: "API Keys" },
  { id: "integrations", label: "Integrations" }, { id: "blank", label: "Blank Page" },
  { id: "not-found", label: "404 Error" }, { id: "maintenance", label: "Maintenance" },
] as const;
export type PageId = (typeof pageCatalog)[number]["id"];

const dashboardVariants = {
  "logistics-dashboard": lazy(() => import("./Dashboards/LogisticsDashboard.js")),
  "ai-dashboard": lazy(() => import("./Dashboards/AIDashboard.js")),
  "sales-dashboard": lazy(() => import("./Dashboards/SalesDashboard.js")),
  "finance-dashboard": lazy(() => import("./Dashboards/FinanceDashboard.js")),
  "ecommerce-dashboard": lazy(() => import("./Dashboards/ECommerceDashboard.js")),
  "analytics-dashboard": lazy(() => import("./Dashboards/AnalyticsDashboard.js")),
  "marketing-hub": lazy(() => import("./Dashboards/MarketingHub.js")),
  "crm-platform": lazy(() => import("./Dashboards/CRMPlatform.js")),
  "stock-portfolio-dashboard": lazy(() => import("./Dashboards/StockPortfolioDashboard.js")),
  "saas-interface": lazy(() => import("./Dashboards/SaaSInterface.js")),
  "hr-system-dashboard": lazy(() => import("./Dashboards/HRSystemDashboard.js")),
};
type DashboardVariantId = keyof typeof dashboardVariants;
function isDashboardVariant(page: PageId): page is DashboardVariantId {
  return Object.prototype.hasOwnProperty.call(dashboardVariants, page);
}

const members = [
  { name: "Olivia Rhye", email: "olivia@acme.co", role: "Product Designer", status: "Active" },
  { name: "Phoenix Baker", email: "phoenix@acme.co", role: "Engineering", status: "Active" },
  { name: "Lana Steiner", email: "lana@acme.co", role: "Marketing", status: "Invited" },
  { name: "Demi Wilkinson", email: "demi@acme.co", role: "Customer Success", status: "Active" },
  { name: "Candice Wu", email: "candice@acme.co", role: "Engineering", status: "Active" },
  { name: "Natali Craig", email: "natali@acme.co", role: "Product", status: "Inactive" },
];
const money = ["Starter", "Growth", "Scale"];
const features = ["Unlimited projects", "Team collaboration", "Advanced reporting", "Priority support"];

function AnalyticsDashboardPage() {
  const { theme } = useAmphibiUI();
  const tokens = themeTokens[theme];
  const widgets: DashboardGridWidget[] = [
    {
      id: "metrics",
      label: "Workspace metrics",
      defaultHeight: 5,
      content: <div className="aui-dashboard-metrics">
        {[["Total revenue", "$48,290", "+12.8%"], ["Active users", "2,420", "+8.2%"], ["New signups", "384", "+16.4%"], ["Churn rate", "2.4%", "-0.6%"]].map(([label, value, change]) =>
          <Card key={label}><p>{label}</p><strong>{value}</strong><span>{change} this month</span></Card>)}
      </div>,
    },
    {
      id: "revenue-chart",
      label: "Revenue over time",
      defaultWidth: "half",
      defaultHeight: 12,
      content: <DashboardChart type="line" title="Revenue over time" description="Monthly recurring revenue" height={300} data={{
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{ label: "Revenue", data: [28000, 32000, 30500, 39000, 42000, 48290], borderColor: tokens.primary, backgroundColor: `${tokens.primary}22`, fill: true, tension: 0.35, pointBackgroundColor: tokens.primary }],
      }} />,
    },
    {
      id: "customers-chart",
      label: "New customers",
      defaultWidth: "half",
      defaultHeight: 12,
      content: <DashboardChart type="bar" title="New customers" description="Monthly customer acquisition" height={300} data={{
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{ label: "Customers", data: [82, 106, 94, 138, 156, 184], backgroundColor: tokens.primary, borderRadius: 5 }],
      }} />,
    },
    {
      id: "traffic-chart",
      label: "Traffic sources",
      defaultWidth: "half",
      defaultHeight: 12,
      content: <DashboardChart type="doughnut" title="Traffic sources" description="Visitors by channel" height={260} data={{
        labels: ["Organic search", "Direct", "Referral", "Social"],
        datasets: [{ data: [42, 28, 18, 12], backgroundColor: [tokens.primary, tokens.accent, tokens.success, tokens.border], borderColor: tokens.surface, borderWidth: 3 }],
      }} options={{ cutout: "68%", plugins: { legend: { position: "bottom" } } }} />,
    },
  ];

  return <div className="aui-stack">
    <div className="aui-page-intro"><div><h2>Workspace overview</h2><p>Track activity and performance across your workspace.</p></div><Button variant="secondary">Last 30 days⌄</Button></div>
    <Suspense fallback={<Card>Loading dashboard widgets...</Card>}>
      <DashboardGrid dashboardId="workspace-overview" widgets={widgets} />
    </Suspense>
  </div>;
}

export function DataTablesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [tableEngine, setTableEngine] = useState<"native" | "tabulator">("native");
  const roles = [...new Set(members.map((member) => member.role))];
  const filtered = useMemo(() => members
    .filter((member) => `${member.name} ${member.email} ${member.role}`.toLowerCase().includes(search.toLowerCase()))
    .filter((member) => statusFilter === "All statuses" || member.status === statusFilter)
    .filter((member) => roleFilter === "All roles" || member.role === roleFilter), [search, statusFilter, roleFilter]);
  const sorted = useMemo(() => [...filtered]
    .sort((a, b) => sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)), [filtered, sort]);
  const pageSize = 4;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const tabulatorColumns = useMemo<ColumnDefinition[]>(() => [
    { title: "Name", field: "name", sorter: "string", headerSort: true },
    { title: "Status", field: "status", sorter: "string", headerSort: true },
    { title: "Role", field: "role", sorter: "string", headerSort: true },
    { title: "Email", field: "email", sorter: "string", headerSort: true },
  ], []);
  return <div className="aui-stack"><div className="aui-page-intro"><div><h2>Team members</h2><p>Manage your team and their account permissions.</p></div><Button>+ Add member</Button></div><Card><div className="aui-table-toolbar"><label className="aui-search">⌕ <input aria-label="Search members" placeholder="Search members" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label><div className="aui-table-filters"><label>Status<select aria-label="Filter by status" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}><option>All statuses</option>{["Active", "Invited", "Inactive"].map((status) => <option key={status}>{status}</option>)}</select></label><label>Role<select aria-label="Filter by role" value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setPage(1); }}><option>All roles</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></label><label>Table engine<select aria-label="Table engine" value={tableEngine} onChange={(event) => setTableEngine(event.target.value as "native" | "tabulator")}><option value="native">AmphibiUI</option><option value="tabulator">Tabulator</option></select></label></div></div>{tableEngine === "tabulator" ? <Suspense fallback={<div className="aui-tabulator-loading" role="status">Loading Tabulator table...</div>}><TabulatorDataTable data={filtered} columns={tabulatorColumns} paginationSize={pageSize} ariaLabel="Team members table powered by Tabulator" /></Suspense> : <><div className="aui-table-wrap"><table className="aui-table"><thead><tr><th><input type="checkbox" aria-label="Select all members" /></th><th><button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>Name {sort === "asc" ? "↑" : "↓"}</button></th><th>Status</th><th>Role</th><th>Email</th><th>Actions</th></tr></thead><tbody>{sorted.slice((page - 1) * pageSize, page * pageSize).map((member) => <tr key={member.email}><td><input type="checkbox" aria-label={`Select ${member.name}`} /></td><td><div className="aui-member"><Avatar name={member.name} size="sm" /><strong>{member.name}</strong></div></td><td><Badge tone={member.status === "Active" ? "success" : "default"}>{member.status}</Badge></td><td>{member.role}</td><td>{member.email}</td><td><Button variant="ghost">Edit</Button></td></tr>)}{filtered.length === 0 && <tr><td colSpan={6}>No team members match your search.</td></tr>}</tbody></table></div><Pagination page={Math.min(page, pages)} pages={pages} onChange={setPage} /></>}</Card></div>;
}

export function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return <div className="aui-stack"><div className="aui-page-intro"><div><h2>Personal settings</h2><p>Manage your profile and account preferences.</p></div></div>{saved && <Alert tone="success">Your settings have been saved.</Alert>}<Tabs tabs={[
    { label: "Profile", content: <Card><h3>Profile information</h3><p>Update your photo and personal details.</p><div className="aui-form-grid"><label>Name<input defaultValue="Alex Morgan" /></label><label>Email<input type="email" defaultValue="alex@company.com" /></label><label>Role<input defaultValue="Product Manager" /></label><label>Timezone<select defaultValue="UTC-8"><option>UTC-8</option><option>UTC</option><option>UTC+1</option></select></label></div><Button onClick={() => setSaved(true)}>Save changes</Button></Card> },
    { label: "Account", content: <Card><h3>Account preferences</h3><List items={["Product updates", "Weekly activity summary", "Usage notifications"].map((label) => <label className="aui-check"><input type="checkbox" defaultChecked /> {label}</label>)} /><Button onClick={() => setSaved(true)}>Save preferences</Button></Card> },
    { label: "Security", content: <Card><h3>Change password</h3><div className="aui-form-grid"><label>Current password<input type="password" /></label><label>New password<input type="password" /></label></div><Button onClick={() => setSaved(true)}>Update password</Button></Card> },
  ]} /></div>;
}

function ContentPage({ page, onNotice, onNavigate }: { page: PageId; onNotice: (message: string) => void; onNavigate?: (page: PageId) => void }) {
  const title = pageCatalog.find((item) => item.id === page)?.label ?? "Dashboard";
  const card = (heading: string, text: string, action?: string) => <Card key={heading}><div className="aui-page-intro"><div><h3>{heading}</h3><p>{text}</p></div>{action && <Button variant="secondary" onClick={() => onNotice(`${action} complete`)}>{action}</Button>}</div></Card>;
  if (isDashboardVariant(page)) {
    const DashboardVariant = dashboardVariants[page];
    return <Suspense fallback={<Card>Loading dashboard...</Card>}><DashboardVariant /></Suspense>;
  }
  switch (page) {
    case "dashboard": return <AnalyticsDashboardPage />;
    case "calendar": return <Suspense fallback={<Card>Loading calendar...</Card>}><CalendarPage /></Suspense>;
    case "data-tables": return <DataTablesPage />;
    case "form-elements": return <Suspense fallback={<Card>Loading form elements...</Card>}><FormElementsPage /></Suspense>;
    case "settings": return <SettingsPage />;
    case "profile": return <div className="aui-stack"><Card><div className="aui-profile"><Avatar name="Alex Morgan" size="lg" /><div><h2>Alex Morgan</h2><p>Product Manager · San Francisco, CA</p><p>Building thoughtful products with a focus on people, systems, and the details in between.</p><Button variant="secondary">Edit profile</Button></div></div></Card><div className="aui-grid-3">{card("Projects", "12 active projects")}{card("Team", "Working with 8 teammates")}{card("Activity", "34 contributions this month")}</div></div>;
    case "faq": return <div className="aui-stack">{["How do I invite teammates?", "Can I change my plan?", "Where can I find invoices?", "How do I contact support?"].map((question, index) => <Card key={question}><details><summary>{question}</summary><p>{["Open Settings → Team and select Add member.", "Plan changes are available from Billing settings.", "Invoices are listed in your workspace billing history.", "Send us a message from the Support page."][index]}</p></details></Card>)}</div>;
    case "pricing": return <div className="aui-grid-3">{money.map((plan, i) => <Card key={plan}><Badge>{i === 1 ? "Most popular" : "Flexible plan"}</Badge><h2>{plan}</h2><p>{["For individuals", "For growing teams", "For larger organizations"][i]}</p><h2>${[0, 24, 64][i]}<small>/user/mo</small></h2><List items={features.slice(0, i + 2)} /><Button onClick={() => onNotice(`${plan} plan selected`)}>Choose {plan}</Button></Card>)}</div>;
    case "mailbox": return <MailboxPage onNotice={onNotice} />;
    case "chat": return <div className="aui-inbox"><Card><h3>Messages</h3><List items={["Jordan Lee · Online", "Sam Rivera · Away", "Taylor Kim · Online"]} /></Card><Card><h3>Jordan Lee <Badge tone="success">Online</Badge></h3><div className="aui-chat-thread"><p><b>Jordan</b><br />Hey! How is the new dashboard coming along?</p><p className="aui-chat-own"><b>You</b><br />It is looking great. I will share a preview shortly.</p><p><b>Jordan</b><br />Sounds good, thanks!</p></div><form onSubmit={(e) => { e.preventDefault(); onNotice("Message sent"); }} className="aui-chat-compose"><input aria-label="Message" placeholder="Write a message..." /><Button>Send</Button></form></Card></div>;
    case "teams": return <div className="aui-grid-3">{members.slice(0, 3).map((member) => <Card key={member.email}><Avatar name={member.name} size="lg" /><h3>{member.name}</h3><p>{member.role}</p><Badge tone={member.status === "Active" ? "success" : "default"}>{member.status}</Badge><p>Member · Full access</p><Button variant="secondary">Manage access</Button></Card>)}</div>;
    case "terms": return <Card><h2>Terms and conditions</h2><p>Last updated October 1, 2026</p>{["1. Using the service", "2. Your account", "3. Privacy and data", "4. Acceptable use", "5. Contact"].map((section) => <section key={section}><h3>{section}</h3><p>We provide this workspace to help teams collaborate. You are responsible for keeping account details accurate and for activity performed through your account. We handle information in accordance with our privacy commitments.</p></section>)}</Card>;
    case "kanban": return <KanbanPage />;
    case "files": return <div className="aui-stack"><Card><h3>Storage</h3><Progressbar value={68} label="6.8 GB of 10 GB used" /></Card><div className="aui-grid-3">{["Design assets", "Product roadmap", "Brand guidelines", "Q3 report", "Team photos", "Project brief"].map((file, i) => <Card key={file}><div className="aui-file-icon">{["📁", "📄", "🖼️"][i % 3]}</div><h3>{file}</h3><p>{i % 2 ? "Updated yesterday" : "Updated Oct 2"}</p></Card>)}</div></div>;
    case "tickets": return <div className="aui-stack"><div className="aui-page-intro"><h2>Customer support</h2><Button onClick={() => onNotice("New support ticket started")}>Create ticket</Button></div>{["Cannot access my account", "Invoice question", "Integration setup help", "Feature request: exports"].map((ticket, i) => <Card key={ticket}><div className="aui-page-intro"><div><Badge tone={i === 0 ? "danger" : "warning"}>{i === 0 ? "High" : "Normal"}</Badge><h3>{ticket}</h3><p>#{1048 + i} · {members[i].name} · Updated {i + 1}h ago</p></div><Button variant="secondary">View ticket</Button></div></Card>)}</div>;
    case "ticket-replies": return <Card><Badge tone="warning">In progress</Badge><h2>Cannot access my account</h2><p>Ticket #1048 · Opened today</p><div className="aui-chat-thread"><p><b>Jamie Park · Customer</b><br />I am unable to sign in after resetting my password.</p><p className="aui-chat-own"><b>Support · You</b><br />I am sorry about that. I have refreshed your login session; please try again.</p><p><b>Jamie Park · Customer</b><br />That worked, thank you!</p></div><form className="aui-chat-compose" onSubmit={(e) => { e.preventDefault(); onNotice("Reply sent"); }}><input aria-label="Reply" placeholder="Write a reply..." /><Button>Send reply</Button></form></Card>;
    case "api-keys": return <ApiKeysPage />;
    case "integrations": return <div className="aui-grid-3">{["Slack", "GitHub", "Figma", "Google Drive", "Linear", "Salesforce"].map((app, i) => <Card key={app}><div className="aui-integration-icon">{app[0]}</div><h3>{app}</h3><p>{["Team communication", "Code hosting", "Design collaboration", "File storage", "Project tracking", "Customer relationships"][i]}</p><Button variant={i < 2 ? "secondary" : "primary"} onClick={() => onNotice(`${app} integration updated`)}>{i < 2 ? "Connected" : "Connect"}</Button></Card>)}</div>;
    case "blank": return <Card className="aui-blank"><div><h2>Your workspace starts here</h2><p>Add components and content to build a custom dashboard.</p><Button onClick={() => onNotice("Your first item is ready")}>Create your first item</Button></div></Card>;
    case "not-found": return <Card className="aui-status-page"><span>404</span><h2>Page not found</h2><p>The page you are looking for doesn't exist or has moved.</p><Button onClick={() => onNavigate?.("data-tables")}>Back to dashboard</Button></Card>;
    case "maintenance": return <Card className="aui-status-page"><span>🔧</span><h2>We’ll be back soon</h2><p>We are improving your workspace. Thanks for your patience.</p><Progressbar value={72} label="Maintenance progress" /><p>Estimated time remaining: 00:24:18</p><Button variant="secondary" onClick={() => onNotice("You will be notified when we are back")}>Notify me</Button></Card>;
    default: return <Card><h2>{title}</h2><p>Workspace content</p></Card>;
  }
}

function ApiKeysPage() {
  const [visible, setVisible] = useState(false);
  const [created, setCreated] = useState(false);
  return <div className="aui-stack"><Alert tone="warning">API keys provide access to your workspace. Keep them secure and rotate them regularly.</Alert><Card><div className="aui-page-intro"><div><h3>Secret keys</h3><p>Use these keys to authenticate your integrations.</p></div><Button onClick={() => setCreated(true)}>Create new key</Button></div>{created && <Alert tone="success">New key created. Copy it now and store it securely.</Alert>}<div className="aui-table-wrap"><table className="aui-table"><thead><tr><th>Name</th><th>Key</th><th>Created</th><th>Last used</th></tr></thead><tbody>{["Production", "Development"].map((name) => <tr key={name}><td>{name}</td><td><code>{visible ? "aui_live_4d91c8a5f712e843" : "aui_live_••••••••••••e843"}</code></td><td>Oct 1, 2026</td><td>2 hours ago</td></tr>)}</tbody></table></div><Button variant="secondary" onClick={() => setVisible(!visible)}>{visible ? "Hide keys" : "Reveal keys"}</Button></Card></div>;
}

function MailboxPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [composeOpen, setComposeOpen] = useState(false);
  return <>
    <div className="aui-inbox">
      <Card><h3>Inbox</h3><List items={["Inbox · 4", "Starred", "Drafts", "Sent", "Archive"].map((item) => <a key={item} href="#mail" onClick={(event) => event.preventDefault()}>{item}</a>)} /><Button onClick={() => setComposeOpen(true)}>Compose</Button></Card>
      <Card><h3>Recent messages</h3>{["Welcome to the workspace", "Your weekly product digest", "Project Atlas update"].map((subject, index) => <div className="aui-message" key={subject}><Avatar name={["Jordan Lee", "Team Updates", "Morgan Chen"][index]} size="sm" /><div><strong>{subject}</strong><p>{["Jordan Lee", "Team Updates", "Morgan Chen"][index]} · Here is a quick update for you...</p></div></div>)}</Card>
    </div>
    <Modal open={composeOpen} title="Compose message" onClose={() => setComposeOpen(false)}>
      <form className="aui-stack" onSubmit={(event) => { event.preventDefault(); setComposeOpen(false); onNotice("Message sent"); }}>
        <label className="aui-form-grid">To<input type="email" required placeholder="name@example.com" /></label>
        <label className="aui-form-grid">Subject<input required placeholder="Message subject" /></label>
        <label className="aui-form-grid">Message<textarea required rows={5} placeholder="Write your message..." /></label>
        <Button type="submit">Send message</Button>
      </form>
    </Modal>
  </>;
}

function KanbanPage() {
  const [tasks, setTasks] = useState<Record<string, string[]>>({
    "To do": ["Design new dashboard", "Review API documentation", "Plan sprint"],
    "In progress": ["Build navigation", "Update component library"],
    Done: ["Create project brief", "Set up repository"],
  });
  const columns = Object.keys(tasks);
  const moveTask = (task: string, destination: string) => {
    setTasks((current) => {
      const source = columns.find((column) => current[column].includes(task));
      if (!source || source === destination) return current;
      return {
        ...current,
        [source]: current[source].filter((item) => item !== task),
        [destination]: [...current[destination], task],
      };
    });
  };
  return <div className="aui-kanban">{columns.map((column, columnIndex) => <Card key={column} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); moveTask(event.dataTransfer.getData("text/plain"), column); }}><h3>{column} <Badge>{tasks[column].length}</Badge></h3>{tasks[column].map((task, taskIndex) => <Card key={task} className="aui-task" draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", task)}><Badge tone={taskIndex === 0 ? "warning" : "default"}>{taskIndex === 0 ? "High priority" : "Task"}</Badge><h4>{task}</h4><p>Due Oct {12 + taskIndex}</p><Avatar name={members[(columnIndex + taskIndex) % members.length].name} size="sm" /><label className="aui-task-move">Move to<select aria-label={`Move ${task}`} value={column} onChange={(event) => moveTask(task, event.target.value)}>{columns.map((option) => <option key={option}>{option}</option>)}</select></label></Card>)}</Card>)}</div>;
}

export function ApplicationPage({ page, onNavigate }: { page: PageId; onNavigate?: (page: PageId) => void }) {
  const [notice, setNotice] = useState("");
  return <div className="aui-stack"><ContentPage page={page} onNotice={setNotice} onNavigate={onNavigate} />{notice && <Alert tone="success">{notice} <button className="aui-alert-close" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></Alert>}</div>;
}
