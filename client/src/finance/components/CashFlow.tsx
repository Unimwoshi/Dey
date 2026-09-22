import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import {PiWarningCircle, PiArrowClockwise, PiChartLineUp} from 'react-icons/pi'
import type {SectionState} from '../../dashboard/context/DashboardContext'
import type {CashFlowPoint} from '../types'

interface CashFlowProps {
  state: SectionState
  data: CashFlowPoint[]
  onRetry: () => void
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

const CashFlow = ({ state, data, onRetry }: CashFlowProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[260px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] text-white-64">Cash flow</h2>
        {state === 'success' && (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[12px] text-white-64">
              <span className="w-2 h-2 rounded-full bg-success" /> Money in
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-white-64">
              <span className="w-2 h-2 rounded-full bg-white-40" /> Money out
            </span>
          </div>
        )}
      </div>

      {state === 'loading' && <div className="h-40 w-full bg-white-8 rounded animate-pulse" />}

      {state === 'error' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load cash flow.</p>
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
          <PiChartLineUp className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No cash flow data yet</p>
        </div>
      )}

      {state === 'success' && (
        <div className="w-full h-[200px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={4}>
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
              <Bar dataKey="moneyIn" name="Money in" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="moneyOut" name="Money out" fill="var(--color-white-40)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default CashFlow