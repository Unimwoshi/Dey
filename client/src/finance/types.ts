export interface FinanceAccountSummary {
    id: string
    name: string
    type: 'bank' | 'cash' | 'mobile_money' | 'other'
    balance: number
  }
  
  export interface FinancialSummaryData {
    totalBalance: number
    moneyIn: number
    moneyOut: number
    netCashFlow: number
    receivablesTotal: number
    payablesTotal: number
  }
  
  export interface CashFlowPoint {
    label: string
    moneyIn: number
    moneyOut: number
  }
  
  export type TransactionType = 'income' | 'expense' | 'transfer' | 'adjustment'
  
  export interface Transaction {
    id: string
    type: TransactionType
    description: string
    amount: number
    date: string
    accountName: string
    categoryLabel: string
  }
  
  // Stubs for later stages — kept here so FinanceContext can hold these as
  // typed empty-array state from Stage 1 onward, instead of being restructured
  // when Invoices/Receivables/Payables/Budgets/Reconciliation get built.
  export interface Invoice {
    id: string
    [key: string]: unknown
  }
  
  export interface Receivable {
    id: string
    [key: string]: unknown
  }
  
  export interface Payable {
    id: string
    [key: string]: unknown
  }
  
  export interface Budget {
    id: string
    [key: string]: unknown
  }
  
  export interface Reconciliation {
    id: string
    [key: string]: unknown
  }