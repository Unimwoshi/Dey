import {PiWarningCircle} from 'react-icons/pi'


export type StatChipState = 'loading' | 'success' | 'empty' | 'error'

interface StatChipProps {
  state: StatChipState
  icon: React.ReactNode
  label: string
  value?: string
  onRetry?: () => void
}  

const StatChip = ({ state, icon, label, value, onRetry }: StatChipProps) => {
  if (state === 'loading') {
    return (
      <div className="bg-white-4 rounded border border-primary p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white-8 animate-pulse shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="h-2.5 w-16 bg-white-8 rounded mb-1.5 animate-pulse" />
          <div className="h-3.5 w-20 bg-white-8 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="bg-white-4 rounded border border-primary p-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-fail/10 flex items-center justify-center shrink-0">
          <PiWarningCircle className="w-4 h-4 text-fail" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-white-64 truncate">{label}</p>
          <button
            type="button"
            onClick={onRetry}
            className="text-[12px] text-white-80 underline underline-offset-2 hover:text-white"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="bg-white-4 rounded border border-primary p-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-white-8 flex items-center justify-center shrink-0">
          <span className="text-white-40">{icon}</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-white-64 truncate">{label}</p>
          <p className="text-[14px] text-white-40">No data yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white-4 rounded border border-primary p-4 flex items-center gap-3">
      <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
        <span className="text-accent">{icon}</span>
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-white-64 truncate">{label}</p>
        <p className="text-[16px] text-white-80 font-semibold truncate">{value}</p>
      </div>
    </div>
  )
}

export default StatChip