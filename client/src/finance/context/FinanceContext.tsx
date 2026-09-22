import {createContext, useContext, useState, useCallback, ReactNode} from 'react'
import type {FinancialSummaryData, CashFlowPoint, Transaction, FinanceAccountSummary,
  Invoice, Receivable, Payable, Budget, Reconciliation} from '../types'
import {mockFinancialSummary, mockCashFlow, mockTransactions, mockAccounts} from '../../data/mockFinanceData'
import type {SectionState} from '../../dashboard/context/DashboardContext'

interface FinanceContextValue {
  summary: FinancialSummaryData | null
  cashFlow: CashFlowPoint[]
  transactions: Transaction[]
  accounts: FinanceAccountSummary[]

  // Empty-array state slots for later stages, per spec §10's FinanceContextType.
  // Kept here from Stage 1 so Invoices/Receivables/Payables/Budgets/
  // Reconciliation pages extend this context rather than restructuring it.
  invoices: Invoice[]
  receivables: Receivable[]
  payables: Payable[]
  budgets: Budget[]
  reconciliations: Reconciliation[]

  loading: boolean
  error: string | null
  refreshFinance: () => void

  // TEMPORARY — dev-only. Delete once refreshFinance() talks to a backend.
  __devSimulateState: (state: SectionState) => void

  // Stub implementations, mock-only for now — signatures intentionally
  // flexible per spec §10 until the backend is designed.
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  createInvoice: (payload: unknown) => void
  startReconciliation: (payload: unknown) => void
}

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined)

interface FinanceProviderProps {
  children: ReactNode
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [summary, setSummary] = useState<FinancialSummaryData | null>(mockFinancialSummary)
  const [cashFlow, setCashFlow] = useState<CashFlowPoint[]>(mockCashFlow)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [accounts, setAccounts] = useState<FinanceAccountSummary[]>(mockAccounts)

  const [invoices] = useState<Invoice[]>([])
  const [receivables] = useState<Receivable[]>([])
  const [payables] = useState<Payable[]>([])
  const [budgets] = useState<Budget[]>([])
  const [reconciliations] = useState<Reconciliation[]>([])

  const refreshFinance = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setSummary(mockFinancialSummary)
      setCashFlow(mockCashFlow)
      setTransactions(mockTransactions)
      setAccounts(mockAccounts)
      setLoading(false)
    }, 600)
  }, [])

  const __devSimulateState = useCallback((state: SectionState) => {
    if (state === 'loading') {
      setLoading(true)
      setError(null)
      return
    }
    setLoading(false)

    if (state === 'error') {
      setError('Failed to load finance data.')
      return
    }
    setError(null)

    if (state === 'empty') {
      setSummary(null)
      setCashFlow([])
      setTransactions([])
      return
    }

    // success
    setSummary(mockFinancialSummary)
    setCashFlow(mockCashFlow)
    setTransactions(mockTransactions)
    setAccounts(mockAccounts)
  }, [])

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [{ ...tx, id: `tx_${Date.now()}` }, ...prev])
  }, [])

  const createInvoice = useCallback((_payload: unknown) => {
    // Stub — Invoices.tsx implements this against real invoice state later.
  }, [])

  const startReconciliation = useCallback((_payload: unknown) => {
    // Stub — Reconciliation.tsx implements this against real reconciliation state later.
  }, [])

  const value: FinanceContextValue = {
    summary,
    cashFlow,
    transactions,
    accounts,
    invoices,
    receivables,
    payables,
    budgets,
    reconciliations,
    loading,
    error,
    refreshFinance,
    __devSimulateState,
    addTransaction,
    createInvoice,
    startReconciliation,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance(): FinanceContextValue {
  const ctx = useContext(FinanceContext)
  if (!ctx) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return ctx
}