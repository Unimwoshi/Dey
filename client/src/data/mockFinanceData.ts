import type {FinancialSummaryData, CashFlowPoint, Transaction, FinanceAccountSummary} from '../finance/types'

export const mockFinancialSummary: FinancialSummaryData = {
  totalBalance: 1245500,
  moneyIn: 600000,
  moneyOut: 410000,
  netCashFlow: 190000,
  receivablesTotal: 320000,
  payablesTotal: 175000,
}

export const mockCashFlow: CashFlowPoint[] = [
  { label: 'Apr', moneyIn: 420000, moneyOut: 310000 },
  { label: 'May', moneyIn: 480000, moneyOut: 350000 },
  { label: 'Jun', moneyIn: 510000, moneyOut: 400000 },
  { label: 'Jul', moneyIn: 460000, moneyOut: 420000 },
  { label: 'Aug', moneyIn: 540000, moneyOut: 390000 },
  { label: 'Sep', moneyIn: 600000, moneyOut: 410000 },
]

export const mockTransactions: Transaction[] = [
  { id: 'tx1', type: 'income', description: 'Payment received — Chidi O.', amount: 45000, date: 'Today, 10:24 AM', accountName: 'GTBank', categoryLabel: 'Sales' },
  { id: 'tx2', type: 'expense', description: 'Inventory restock', amount: -120000, date: 'Yesterday, 4:02 PM', accountName: 'GTBank', categoryLabel: 'Inventory' },
  { id: 'tx3', type: 'expense', description: 'Electricity bill', amount: -18000, date: 'Sep 8', accountName: 'Cash', categoryLabel: 'Utilities' },
  { id: 'tx4', type: 'transfer', description: 'Transfer to POS account', amount: -50000, date: 'Sep 6', accountName: 'GTBank', categoryLabel: 'Transfer' },
  { id: 'tx5', type: 'income', description: 'Invoice #0031 paid', amount: 82000, date: 'Sep 5', accountName: 'GTBank', categoryLabel: 'Sales' },
]

export const mockAccounts: FinanceAccountSummary[] = [
  { id: 'acc1', name: 'GTBank', type: 'bank', balance: 980500 },
  { id: 'acc2', name: 'Cash', type: 'cash', balance: 120000 },
  { id: 'acc3', name: 'POS Terminal', type: 'mobile_money', balance: 145000 },
]