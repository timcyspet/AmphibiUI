import { Badge, Button } from "../../components/Elements/index.js";
import { DashboardChart } from "../../components/Charts/DashboardChart.js";
import { DashboardPageFrame, DashboardTable, MetricGrid, statusTone } from "./DashboardWidgets.js";
import { hrDepartmentHeadcount, hrEmployees, hrMetrics, hrPayrollTrend, months } from "./mockData.js";

export function HRSystemDashboard() {
  return <DashboardPageFrame title="People operations" description="Review workforce performance, payroll allocation, and attendance." action={<Button variant="secondary">Export roster</Button>}>
    <MetricGrid items={hrMetrics} />
    <div className="aui-variant-grid-2">
      <DashboardChart type="bar" title="Headcount by department" description="Monthly team growth" data={{
        labels: ["Engineering", "Product", "Sales", "Marketing", "Operations"],
        datasets: [{ label: "Employees", data: hrDepartmentHeadcount, borderRadius: 5 }],
      }} />
      <DashboardChart type="line" title="Payroll allocation" description="Monthly payroll · USD thousands" data={{
        labels: months, datasets: [{ label: "Payroll", data: hrPayrollTrend, tension: 0.35 }],
      }} />
    </div>
    <DashboardTable title="Staff performance and attendance" columns={["Employee", "Department", "Review", "Attendance", "Last check-in", "Monthly salary"]}
      rows={hrEmployees.map((employee) => [<strong>{employee.name}</strong>, employee.department, <Badge tone={statusTone(employee.rating)}>{employee.rating}</Badge>, employee.attendance, employee.lastCheckIn, employee.salary])} />
  </DashboardPageFrame>;
}

export default HRSystemDashboard;
