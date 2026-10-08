import {
  useState, type ButtonHTMLAttributes, type HTMLAttributes, type ImgHTMLAttributes,
  type ReactNode, type AnchorHTMLAttributes,
} from "react";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";

type ElementProps = HTMLAttributes<HTMLElement> & { children?: ReactNode };
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" };
const cx = (...items: Array<string | undefined | false>) => items.filter(Boolean).join(" ");
const frameworkClass = (framework: "tailwind" | "bootstrap", tailwind: string, bootstrap: string) =>
  framework === "tailwind" ? tailwind : bootstrap;

export function Alert({ children, className, tone = "info", ...props }: ElementProps & { tone?: "info" | "success" | "warning" | "danger" }) {
  const { framework } = useAmphibiUIOptional();
  return <div role="status" className={cx("aui-alert", `aui-alert-${tone}`, frameworkClass(framework, "rounded-lg border p-4", "alert"), className)} {...props}>{children}</div>;
}

export function Avatar({ src, alt = "", name, size = "md", className, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src?: string; name?: string; size?: "sm" | "md" | "lg" }) {
  const initials = name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
  return src
    ? <img src={src} alt={alt || name || "User avatar"} className={cx("aui-avatar", `aui-avatar-${size}`, className)} {...props} />
    : <span role="img" aria-label={name ? `${name} avatar` : "User avatar"} className={cx("aui-avatar aui-avatar-fallback", `aui-avatar-${size}`, className)}>{initials}</span>;
}

export function Badge({ children, className, tone = "default", ...props }: ElementProps & { tone?: "default" | "success" | "warning" | "danger" }) {
  return <span className={cx("aui-badge", `aui-badge-${tone}`, className)} {...props}>{children}</span>;
}

export function Breadcrumbs({ items, className }: { items: Array<{ label: string; href?: string }>; className?: string }) {
  return <nav aria-label="Breadcrumb" className={cx("aui-breadcrumbs", className)}><ol>{items.map((item, index) =>
    <li key={`${item.label}-${index}`}>{item.href && index < items.length - 1 ? <a href={item.href}>{item.label}</a> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>}{index < items.length - 1 && <span aria-hidden="true"> / </span>}</li>)}</ol></nav>;
}

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const { framework } = useAmphibiUIOptional();
  return <button className={cx("aui-button", `aui-button-${variant}`, frameworkClass(framework, "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition", "btn"), className)} {...props}>{children}</button>;
}

export function Card({ children, className, ...props }: ElementProps) {
  return <section className={cx("aui-card", className)} {...props}>{children}</section>;
}

export function Carousel({ items, label = "Featured items" }: { items: ReactNode[]; label?: string }) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  return <div className="aui-carousel" aria-label={label}><div className="aui-carousel-item">{items[active]}</div><div className="aui-carousel-controls"><Button aria-label="Previous item" variant="secondary" onClick={() => setActive((active - 1 + items.length) % items.length)}>Previous</Button><span>{active + 1} / {items.length}</span><Button aria-label="Next item" variant="secondary" onClick={() => setActive((active + 1) % items.length)}>Next</Button></div></div>;
}

export function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="aui-dropdown"><Button variant="secondary" aria-expanded={open} onClick={() => setOpen(!open)}>{label} <span aria-hidden="true">⌄</span></Button>{open && <div className="aui-dropdown-menu" role="menu">{children}</div>}</div>;
}

export function Image({ alt, className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt ?? ""} loading="lazy" className={cx("aui-image", className)} {...props} />;
}

export function Link({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx("aui-link", className)} {...props}>{children}</a>;
}

export function List({ items, ordered = false, className }: { items: ReactNode[]; ordered?: boolean; className?: string }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={cx("aui-list", className)}>{items.map((item, index) => <li key={index}>{item}</li>)}</Tag>;
}

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="aui-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="aui-modal" role="dialog" aria-modal="true" aria-label={title}><header><h2>{title}</h2><Button variant="ghost" aria-label="Close dialog" onClick={onClose}>×</Button></header><div>{children}</div></section></div>;
}

export function Notification({ title, children, onDismiss }: { title: string; children: ReactNode; onDismiss?: () => void }) {
  return <aside className="aui-notification" role="status"><div><strong>{title}</strong><div>{children}</div></div>{onDismiss && <Button variant="ghost" aria-label="Dismiss notification" onClick={onDismiss}>×</Button>}</aside>;
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  return <nav className="aui-pagination" aria-label="Pagination"><Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button><span>Page {page} of {pages}</span><Button variant="secondary" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</Button></nav>;
}

export function Popover({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <span className="aui-popover"><Button variant="secondary" aria-expanded={open} onClick={() => setOpen(!open)}>{label}</Button>{open && <span className="aui-popover-content" role="note">{children}</span>}</span>;
}

export function Progressbar({ value, label = "Progress" }: { value: number; label?: string }) {
  const normalized = Math.min(100, Math.max(0, value));
  return <div className="aui-progress"><div className="aui-progress-label"><span>{label}</span><span>{normalized}%</span></div><div role="progressbar" aria-label={label} aria-valuenow={normalized} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${normalized}%` }} /></div></div>;
}

export function Ribbon({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "danger" | "success" }) {
  return <span className={`aui-ribbon aui-ribbon-${tone}`}>{children}</span>;
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return <span className="aui-spinner" role="status" aria-label={label}><span className="aui-spinner-ring" /><span className="aui-sr-only">{label}</span></span>;
}

export function Tabs({ tabs }: { tabs: Array<{ label: string; content: ReactNode }> }) {
  const [active, setActive] = useState(0);
  return <div className="aui-tabs"><div role="tablist">{tabs.map((tab, index) => <button key={tab.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{tab.label}</button>)}</div><section role="tabpanel">{tabs[active]?.content}</section></div>;
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <span className="aui-tooltip" tabIndex={0}>{children}<span role="tooltip">{label}</span></span>;
}

export function Video({ src, title, poster }: { src: string; title: string; poster?: string }) {
  return <video className="aui-video" controls preload="metadata" poster={poster}><source src={src} /><track kind="captions" srcLang="en" label="English captions" />{title}</video>;
}

export function NotificationCenter({ notifications }: { notifications: Array<{ title: string; description: string }> }) {
  return <div className="aui-notification-center">{notifications.map((notification) => <Notification key={notification.title} title={notification.title}>{notification.description}</Notification>)}</div>;
}
