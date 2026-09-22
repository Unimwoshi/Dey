import StatChip from '../../dashboard/components/StatChip'
import {PiWallet, PiArrowCircleDown, PiArrowCircleUp, PiTrendUp, PiReceipt, PiHandCoins} from 'react-icons/pi'
import type {SectionState} from '../../dashboard/context/DashboardContext'
import type {FinancialSummaryData} from '../types'

interface FinancialSummaryProps {
  state: SectionState
  data: FinancialSummaryData | null
  onRetry: () => void
}

function formatCurrency(value: number) {
  return `\u20A6${Math.abs(value).toLocaleString()}`
}

const FinancialSummary = ({ state, data, onRetry }: FinancialSummaryProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatChip
        state={state}
        icon={<PiWallet className="w-5 h-5" />}
        label="Total balance"
        value={data ? formatCurrency(data.totalBalance) : undefined}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiArrowCircleDown className="w-5 h-5" />}
        label="Money in"
        value={data ? formatCurrency(data.moneyIn) : undefined}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiArrowCircleUp className="w-5 h-5" />}
        label="Money out"
        value={data ? formatCurrency(data.moneyOut) : undefined}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiTrendUp className="w-5 h-5" />}
        label="Net cash flow"
        value={data ? formatCurrency(data.netCashFlow) : undefined}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiReceipt className="w-5 h-5" />}
        label="Receivables"
        value={data ? formatCurrency(data.receivablesTotal) : undefined}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiHandCoins className="w-5 h-5" />}
        label="Payables"
        value={data ? formatCurrency(data.payablesTotal) : undefined}
        onRetry={onRetry}
      />
    </div>
  )
}

export default FinancialSummary