import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import {
  PiWarningCircle,
  PiArrowClockwise,
  PiChartLineUp,
  PiTrendUp
} from "react-icons/pi";

export type FinancialOverviewState = 'loading' | 'success' | 'empty' | 'error'

export interface FinancialTrendPoint {
  label: string
  revenue: number
  expenses: number
}

export interface FinancialOverviewProps {
  state: FinancialOverviewState
  period?: string
  netIncome?: number
  revenue?: number
  expenses?: number
  trend?: FinancialTrendPoint[]
  onRetry?: () => void
}

function formatCurrency(value: number) {
  return `\u20A6${Math.abs(value).toLocaleString()}`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-[4px] bg-bg-secondary border border-white-40 px-3 py-2 text-[12px]">
      <p className="text-white-64 mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

const FinancialOverview = ({
  state,
  period = 'This month',
  netIncome = 0,
  revenue = 0,
  expenses = 0,
  trend = [],
  onRetry,
}: FinancialOverviewProps) => {
  const isProfit = netIncome >= 0

  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-6 min-h-[320px]">
      {state === 'loading' && (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-4 w-24 bg-white-8 rounded" />
          <div className="h-10 w-48 bg-white-8 rounded" />
          <div className="flex gap-6">
            <div className="h-4 w-28 bg-white-8 rounded" />
            <div className="h-4 w-28 bg-white-8 rounded" />
          </div>
          <div className="h-40 w-full bg-white-8 rounded" />
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <PiWarningCircle className="w-8 h-8 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load your financial overview.</p>
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
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <PiChartLineUp className="w-8 h-8 text-white-40" />
          <p className="text-white-80 text-[14px]">No financial activity yet</p>
          <p className="text-white-64 text-[12px] max-w-[280px]">
            Record your first transaction to see revenue, expenses, and net income here.
          </p>
        </div>
      )}

      {state === 'success' && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] text-white-64">{period}</h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[12px] text-white-64">
                <span className="w-2 h-2 rounded-full bg-success" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white-64">
                <span className="w-2 h-2 rounded-full bg-white-64" /> Expenses
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white-64">Net {isProfit ? 'income' : 'loss'}</span>
            <div className="flex items-center gap-3">
              <span className="text-[28px] md:text-[36px] font-bold text-white-80">
                {formatCurrency(netIncome)}
              </span>
              <span
                className={`flex items-center gap-1 text-[12px] px-2 py-1 rounded-full ${
                  isProfit ? 'bg-success/10 text-success' : 'bg-fail/10 text-fail'
                }`}
              >
                {isProfit ? <PiTrendUp className="w-3 h-3" /> : <PiTrendDown className="w-3 h-3" />}
                {isProfit ? 'Profit' : 'Loss'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-white-64">Revenue</span>
              <span className="text-[16px] text-white-80">{formatCurrency(revenue)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-white-64">Expenses</span>
              <span className="text-[16px] text-white-80">{formatCurrency(expenses)}</span>
            </div>
          </div>

          {trend.length > 0 ? (
            <div className="w-full h-[180px] -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={4}>
                  <CartesianGrid vertical={false} stroke="var(--color-white-8)" />
                  <XAxis
                    dataKey="label"
                    stroke="var(--color-white-40)"
                    tick={{ fill: 'var(--color-white-40)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-white-4)' }} />
                  <Bar dataKey="revenue" name="Revenue" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="var(--color-white-64)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-white-64 text-[12px]">Not enough data yet to show a trend.</p>
          )}
        </>
      )}
    </section>
  )
}

export default FinancialOverview
