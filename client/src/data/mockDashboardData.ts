import type { FinancialTrendPoint } from '../components/FinancialOverview'
import type { BusinessSnapshotData } from '../components/BusinessSnapshot'
import type { ActivityItem } from '../components/RecentActivity'

export const mockTrend: FinancialTrendPoint[] = [
  { label: 'Apr', revenue: 420000, expenses: 310000 },
  { label: 'May', revenue: 480000, expenses: 350000 },
  { label: 'Jun', revenue: 510000, expenses: 400000 },
  { label: 'Jul', revenue: 460000, expenses: 420000 },
  { label: 'Aug', revenue: 540000, expenses: 390000 },
  { label: 'Sep', revenue: 600000, expenses: 410000 },
]

export const mockBusinessSnapshot: BusinessSnapshotData = {
  name: "Grace's Boutique",
  type: 'Sole proprietorship',
  industry: 'Retail',
  transactionCount: 214,
  teamSize: 4,
  enabledModules: ['Finances', 'Team'],
}

export const mockActivity: ActivityItem[] = [
  { id: '1', description: 'Payment received from Chidi O.', timestamp: 'Today, 10:24 AM', amount: 45000 },
  { id: '2', description: 'Expense — Inventory restock', timestamp: 'Yesterday, 4:02 PM', amount: -120000 },
  { id: '3', description: 'Invoice #0032 sent to Amaka T.', timestamp: 'Yesterday, 11:15 AM' },
  { id: '4', description: 'Tunde A. joined the team', timestamp: '2 days ago' },
]