import {Link} from 'react-router-dom'
import {PiWarningCircle, PiArrowClockwise, PiReceipt, PiArrowsLeftRight} from 'react-icons/pi'
import type {SectionState} from '../../dashboard/context/DashboardContext'
import type {Transaction } from '../types'

interface RecentTransactionsProps {
  state: SectionState
  transactions: Transaction[]
  onRetry: () => void
}

function formatAmount(amount: number) {
  const sign = amount < 0 ? '-' : '+'
  return `${sign}\u20A6${Math.abs(amount).toLocaleString()}`
}

const RecentTransactions = ({ state, transactions, onRetry }: RecentTransactionsProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] text-white-64">Recent transactions</h2>
        <Link to="/dashboard/finance/transactions" className="text-[12px] text-accent hover:underline">
          View all
        </Link>
      </div>

      {state === 'loading' && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load transactions.</p>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-[4px] bg-white-4 border border-primary hover:bg-white-8 text-white-80 text-[14px] transition-colors"
          >
            <PiArrowClockwise className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {state === 'empty' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center py-6">
          <PiReceipt className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No transactions yet</p>
          <p className="text-white-64 text-[12px] max-w-[240px]">
            Record your first transaction to start building your ledger.
          </p>
        </div>
      )}

      {state === 'success' && (
        <ul className="flex flex-col gap-1">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors">
              <span className="w-8 h-8 rounded-full bg-white-8 flex items-center justify-center shrink-0 text-white-64">
                {tx.type === 'transfer' ? <PiArrowsLeftRight className="w-4 h-4" /> : <PiReceipt className="w-4 h-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-white-80 truncate">{tx.description}</p>
                <p className="text-[12px] text-white-64">{tx.accountName} · {tx.categoryLabel} · {tx.date}</p>
              </div>
              <span className={`text-[14px] shrink-0 ${tx.amount < 0 ? 'text-white-64' : 'text-success'}`}>
                {formatAmount(tx.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default RecentTransactions