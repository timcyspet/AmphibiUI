import type { CSSProperties } from "react";
import type { CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";
import { themeTokens } from "../../theme/tokens.js";

const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin];
const headerToolbar = {
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
};

export type AmphibiCalendarProps = Omit<CalendarOptions, "plugins" | "themeSystem"> & {
  title?: string;
  description?: string;
  className?: string;
};

export function AmphibiCalendar({
  title = "Calendar",
  description,
  className,
  ...calendarOptions
}: AmphibiCalendarProps) {
  const { framework, theme } = useAmphibiUIOptional();
  const tokens = themeTokens[theme];
  const style = {
    "--aui-calendar-background": tokens.surface,
    "--aui-calendar-text": tokens.text,
    "--aui-calendar-muted": tokens.textMuted,
    "--aui-calendar-border": tokens.border,
    "--aui-calendar-primary": tokens.primary,
    "--aui-calendar-primary-contrast": tokens.primaryContrast,
    "--aui-calendar-today": tokens.surfaceMuted,
  } as CSSProperties;

  return (
    <section className={["aui-card", "aui-calendar-card", className].filter(Boolean).join(" ")} style={style}>
      <header className="aui-calendar-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>
      <FullCalendar
        plugins={plugins}
        themeSystem={framework === "bootstrap" ? "bootstrap5" : "standard"}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        height="auto"
        {...calendarOptions}
      />
    </section>
  );
}
