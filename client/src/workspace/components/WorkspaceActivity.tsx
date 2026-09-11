import {PiWarningCircle, PiArrowClockwise, PiClockCounterClockwise,
  PiCurrencyNgn, PiUsersThree, PiListChecks, PiBriefcase }from 'react-icons/pi'
import type {WorkspaceActivity as WorkspaceActivityType} from '../types'
import type { SectionState} from '../../dashboard/context/DashboardContext'

interface WorkspaceActivityProps {
  state: SectionState
  activities: WorkspaceActivityType[]
  onRetry: () => void
}

function activityIcon(type: WorkspaceActivityType['type']) {
  switch (type) {
    case 'financial':
      return <PiCurrencyNgn className="w-4 h-4" />
    case 'team':
      return <PiUsersThree className="w-4 h-4" />
    case 'task':
      return <PiListChecks className="w-4 h-4" />
    case 'business':
      return <PiBriefcase className="w-4 h-4" />
  }
}

const WorkspaceActivity = ({ state, activities, onRetry }: WorkspaceActivityProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Activity</h2>

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
          <p className="text-white-80 text-[14px]">Couldn't load activity.</p>
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
          <PiClockCounterClockwise className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No activity yet</p>
          <p className="text-white-64 text-[12px] max-w-[240px]">
            Financial, team, task, and business events will show up here.
          </p>
        </div>
      )}

      {state === 'success' && (
        <ul className="flex flex-col gap-1">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors">
              <span className="w-8 h-8 rounded-full bg-white-8 flex items-center justify-center shrink-0 text-white-64">
                {activityIcon(activity.type)}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] text-white-80 truncate">{activity.description}</p>
                <p className="text-[12px] text-white-64">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkspaceActivity