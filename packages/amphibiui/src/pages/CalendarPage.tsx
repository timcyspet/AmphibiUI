import { AmphibiCalendar } from "../components/Calendar/AmphibiCalendar.js";

export default function CalendarPage() {
  const today = new Date();
  const makeDate = (dayOffset: number, hour: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, 0, 0, 0);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:00:00`;
  };

  return <AmphibiCalendar
    title="Team calendar"
    description="Schedule meetings, plan work, and keep the team in sync."
    events={[
      { title: "Product stand-up", start: makeDate(1, 9), end: makeDate(1, 10), backgroundColor: "var(--aui-calendar-primary)" },
      { title: "Design review", start: makeDate(2, 11), end: makeDate(2, 12), backgroundColor: "var(--aui-calendar-primary)" },
      { title: "Sprint planning", start: makeDate(4, 10), end: makeDate(4, 11), backgroundColor: "var(--aui-calendar-primary)" },
      { title: "Customer interview", start: makeDate(6, 14), end: makeDate(6, 15), backgroundColor: "var(--aui-calendar-primary)" },
    ]}
    selectable
    editable
  />;
}
