import type { DashboardMetric } from "./DashboardWidgets.js";

export const logisticsDeliveries = [
  { id: "SHP-2084", destination: "Berlin, DE", carrier: "Northline Air", route: "BER → HAM", eta: "10:35", status: "In transit" },
  { id: "SHP-2083", destination: "Rotterdam, NL", carrier: "Blueway Freight", route: "AMS → RTM", eta: "11:10", status: "On time" },
  { id: "SHP-2082", destination: "Lyon, FR", carrier: "ParcelOne", route: "CDG → LYS", eta: "12:45", status: "Delayed" },
  { id: "SHP-2081", destination: "Copenhagen, DK", carrier: "Northline Air", route: "CPH → AAR", eta: "13:20", status: "On time" },
];

export const aiModelUsage = [
  { model: "Aster Large", requests: "842K", tokens: "318.4M", latency: "740 ms", cost: "$2,418", status: "Healthy" },
  { model: "Aster Fast", requests: "1.9M", tokens: "402.8M", latency: "182 ms", cost: "$1,104", status: "Healthy" },
  { model: "Vector Embed v3", requests: "516K", tokens: "86.2M", latency: "64 ms", cost: "$286", status: "Healthy" },
  { model: "Aster Vision", requests: "94K", tokens: "32.6M", latency: "1.2 s", cost: "$618", status: "Throttled" },
];

export const salesDeals = [
  { company: "Northstar Labs", owner: "Maya Chen", stage: "Negotiation", value: "$84,000", probability: "80%" },
  { company: "Vertex Health", owner: "Noah Williams", stage: "Proposal", value: "$62,500", probability: "60%" },
  { company: "Brightside Group", owner: "Ava Patel", stage: "Qualified", value: "$41,200", probability: "40%" },
  { company: "Openfield Studio", owner: "Leo Martin", stage: "Discovery", value: "$28,000", probability: "20%" },
];

export const financeTransactions = [
  { date: "Oct 12", merchant: "Northstar Cloud", category: "Infrastructure", amount: "-$2,480.00", status: "Cleared" },
  { date: "Oct 11", merchant: "Client retainer · Vertex", category: "Income", amount: "+$8,500.00", status: "Cleared" },
  { date: "Oct 10", merchant: "Studio Supply Co.", category: "Office", amount: "-$684.25", status: "Pending" },
  { date: "Oct 09", merchant: "SaaS subscriptions", category: "Software", amount: "-$329.00", status: "Cleared" },
];

export const ecommerceProducts = [
  { sku: "LW-204", product: "Everyday Carry Pack", category: "Accessories", stock: 128, sold: 84, status: "In stock" },
  { sku: "LW-198", product: "Field Notes Set", category: "Stationery", stock: 16, sold: 72, status: "Low stock" },
  { sku: "LW-176", product: "Ceramic Travel Mug", category: "Drinkware", stock: 0, sold: 56, status: "Out of stock" },
  { sku: "LW-165", product: "Canvas Weekender", category: "Bags", stock: 94, sold: 41, status: "In stock" },
];

export const analyticsSources = [
  { source: "Organic search", sessions: "18,420", conversion: "4.8%", bounce: "32%" },
  { source: "Direct", sessions: "12,860", conversion: "3.6%", bounce: "41%" },
  { source: "Referral", sessions: "6,240", conversion: "5.2%", bounce: "28%" },
  { source: "Social", sessions: "4,980", conversion: "2.1%", bounce: "54%" },
];

export const analyticsDemographicLocations = [
  { name: "United States", longitude: -98.5, latitude: 39.8, customers: 2450, share: 42 },
  { name: "France", longitude: 2.2, latitude: 46.2, customers: 1380, share: 24 },
  { name: "Japan", longitude: 138.2, latitude: 36.2, customers: 820, share: 14 },
  { name: "Brazil", longitude: -51.9, latitude: -14.2, customers: 640, share: 11 },
  { name: "Australia", longitude: 133.8, latitude: -25.3, customers: 510, share: 9 },
];

export const marketingCampaigns = [
  { campaign: "Autumn launch", platform: "Meta Ads", spend: "$8,420", revenue: "$32,880", roi: "3.9×", status: "Active" },
  { campaign: "Search · brand", platform: "Google Ads", spend: "$5,640", revenue: "$25,380", roi: "4.5×", status: "Active" },
  { campaign: "Creator stories", platform: "TikTok", spend: "$3,200", revenue: "$10,240", roi: "3.2×", status: "Review" },
  { campaign: "Product digest", platform: "Email", spend: "$860", revenue: "$6,880", roi: "8.0×", status: "Active" },
];

export const crmLeads = [
  { name: "Horizon Medical", owner: "Priya Shah", stage: "Discovery", lastContact: "Today", value: "$72,000" },
  { name: "Pioneer Retail", owner: "Ethan Cole", stage: "Proposal", lastContact: "Yesterday", value: "$54,500" },
  { name: "Cedar & Co.", owner: "Sofia Reyes", stage: "Qualified", lastContact: "Oct 10", value: "$38,000" },
  { name: "Lumen Works", owner: "Marcus Lee", stage: "Negotiation", lastContact: "Oct 09", value: "$96,000" },
];

export const stockWatchlist = [
  { ticker: "NVDA", company: "NVIDIA Corp.", price: "$182.44", change: "+2.84%", shares: "42", value: "$7,662" },
  { ticker: "MSFT", company: "Microsoft Corp.", price: "$512.18", change: "+0.92%", shares: "18", value: "$9,219" },
  { ticker: "SHOP", company: "Shopify Inc.", price: "$146.72", change: "-1.16%", shares: "35", value: "$5,135" },
  { ticker: "VTI", company: "Vanguard Total Market", price: "$328.61", change: "+0.48%", shares: "24", value: "$7,887" },
];

export const saasRegions = [
  { region: "US East · Virginia", cpu: 62, memory: 71, latency: "28 ms", requests: "18.4K/min" },
  { region: "EU West · Frankfurt", cpu: 48, memory: 64, latency: "42 ms", requests: "12.8K/min" },
  { region: "Asia Pacific · Tokyo", cpu: 76, memory: 82, latency: "56 ms", requests: "9.2K/min" },
];

export const hrEmployees = [
  { name: "Olivia Rhye", department: "Product", rating: "Exceeds", attendance: "98%", lastCheckIn: "08:42 AM", salary: "$8,400" },
  { name: "Phoenix Baker", department: "Engineering", rating: "Strong", attendance: "96%", lastCheckIn: "08:56 AM", salary: "$9,200" },
  { name: "Lana Steiner", department: "Marketing", rating: "Strong", attendance: "94%", lastCheckIn: "09:03 AM", salary: "$7,600" },
  { name: "Demi Wilkinson", department: "Customer Success", rating: "Developing", attendance: "91%", lastCheckIn: "09:18 AM", salary: "$6,900" },
];

export const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export const logisticsMetrics: DashboardMetric[] = [
  { label: "Active deliveries", value: "1,284", change: "+8.4% vs last week" },
  { label: "On-time delivery", value: "96.8%", change: "+2.1 pts" },
  { label: "Fleet utilization", value: "82%", change: "126 vehicles active" },
  { label: "Open bottlenecks", value: "7", change: "2 need attention", tone: "warning" },
];
export const logisticsDeliveryTrend = [820, 910, 880, 1040, 1120, 1284];
export const logisticsRouteEfficiency = [
  { label: "North corridor · 94%", value: 94 },
  { label: "Central corridor · 82%", value: 82 },
  { label: "Coastal corridor · 68%", value: 68 },
];

export const aiMetrics: DashboardMetric[] = [
  { label: "Inference requests", value: "3.36M", change: "+18.2% this month" },
  { label: "Tokens processed", value: "839.9M", change: "+12.6% this month" },
  { label: "Median latency", value: "182 ms", change: "-24 ms", tone: "success" },
  { label: "API spend", value: "$4,426", change: "72% of monthly budget", tone: "warning" },
];
export const aiTokenTrend = [482, 526, 601, 642, 748, 840];
export const aiLatencyTrend = [264, 242, 231, 218, 196, 182];

export const salesMetrics: DashboardMetric[] = [
  { label: "Revenue this month", value: "$284,590", change: "+14.6% vs last month" },
  { label: "Open pipeline", value: "$1.24M", change: "38 active opportunities" },
  { label: "Win rate", value: "32.8%", change: "+3.2 pts" },
  { label: "Average deal size", value: "$18,420", change: "+6.1% this month" },
];
export const salesChannelRevenue = [
  { label: "Current month", data: [112, 74, 56, 42] },
  { label: "Previous month", data: [96, 68, 48, 38] },
];
export const salesConversionTrend = [24, 26, 25, 29, 31, 33];

export const financeMetrics: DashboardMetric[] = [
  { label: "Cash balance", value: "$842,610", change: "+$42,800 this month" },
  { label: "Monthly income", value: "$186,420", change: "+9.4% year over year" },
  { label: "Monthly expenses", value: "$124,880", change: "Within budget" },
  { label: "Card spend", value: "$28,640", change: "68% of monthly limit", tone: "warning" },
];
export const financeCashFlow = [
  { label: "Income", data: [148, 156, 164, 158, 172, 186] },
  { label: "Expenses", data: [112, 118, 109, 126, 120, 125] },
];
export const financeSpendAllocation = [38, 24, 22, 16];

export const ecommerceMetrics: DashboardMetric[] = [
  { label: "Store revenue", value: "$128,420", change: "+16.8% vs last month" },
  { label: "Conversion rate", value: "3.84%", change: "+0.42 pts" },
  { label: "Cart abandonment", value: "61.2%", change: "-4.8 pts", tone: "success" },
  { label: "Returning customers", value: "38.6%", change: "+5.1 pts" },
];
export const ecommerceFunnel = [24800, 16400, 8200, 5100, 3180];
export const ecommerceRetentionTrend = [29, 31, 32, 34, 36, 39];

export const analyticsMetrics: DashboardMetric[] = [
  { label: "Active visitors", value: "1,284", change: "+12% vs previous period" },
  { label: "Sessions", value: "42,500", change: "+8.6% this month" },
  { label: "Bounce rate", value: "38.4%", change: "-3.2 pts", tone: "success" },
  { label: "Goal completions", value: "2,048", change: "+14.2% this month" },
];
export const analyticsTrafficTrend = [
  { label: "Organic", data: [18, 20, 19, 23, 25, 28] },
  { label: "Paid", data: [9, 11, 12, 11, 14, 15] },
];
export const analyticsDeviceShare = [52, 40, 8];

export const marketingMetrics: DashboardMetric[] = [
  { label: "Campaign spend", value: "$18,120", change: "Across 4 platforms" },
  { label: "Attributed revenue", value: "$75,380", change: "+21.4% this month" },
  { label: "Return on ad spend", value: "4.16×", change: "+0.38× vs last month" },
  { label: "Qualified leads", value: "1,842", change: "+11.2% this month" },
];
export const marketingSpendTrend = [12, 14, 13, 16, 17, 18];
export const marketingRevenueTrend = [48, 54, 52, 62, 68, 75];
export const marketingConversionTrend = [2.8, 3.1, 3, 3.5, 3.8, 4.2];

export const crmMetrics: DashboardMetric[] = [
  { label: "Active leads", value: "1,482", change: "+12.2% this month" },
  { label: "Pipeline value", value: "$2.84M", change: "Across 216 opportunities" },
  { label: "Lead conversion", value: "24.8%", change: "+3.4 pts" },
  { label: "Customer churn", value: "2.1%", change: "-0.4 pts", tone: "success" },
];
export const crmLifecycleStages = [38, 29, 21, 12];
export const crmNewLeadTrend = [164, 182, 176, 208, 236, 264];

export const portfolioMetrics: DashboardMetric[] = [
  { label: "Portfolio value", value: "$42,870", change: "+$1,248 today" },
  { label: "Today's return", value: "+2.98%", change: "Outperforming S&P 500" },
  { label: "Total return", value: "+18.4%", change: "+$6,664 all time" },
  { label: "Available cash", value: "$4,280", change: "9.9% of portfolio" },
];
export const portfolioValueTrend = [34200, 36140, 35820, 38900, 41480, 42870];
export const portfolioAssetShare = [48, 24, 18, 10];

export const saasMetrics: DashboardMetric[] = [
  { label: "Monthly recurring revenue", value: "$284,600", change: "+12.4% month over month" },
  { label: "Annual recurring revenue", value: "$3.42M", change: "+18.6% year over year" },
  { label: "New registrations", value: "1,248", change: "+9.8% this month" },
  { label: "Customer churn", value: "1.8%", change: "-0.3 pts", tone: "success" },
];
export const saasMrrTrend = [212, 226, 238, 251, 269, 285];

export const hrMetrics: DashboardMetric[] = [
  { label: "Employees", value: "248", change: "+12 this quarter" },
  { label: "Attendance", value: "96.4%", change: "+1.2 pts vs last month" },
  { label: "Monthly payroll", value: "$1.82M", change: "Within forecast" },
  { label: "Review completion", value: "87%", change: "32 reviews remaining", tone: "warning" },
];
export const hrDepartmentHeadcount = [82, 36, 48, 31, 51];
export const hrPayrollTrend = [1680, 1710, 1730, 1775, 1790, 1820];
