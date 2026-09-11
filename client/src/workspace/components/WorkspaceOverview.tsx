import StatChip from '../../dashboard/components/StatChip'
import {PiUsersThree, PiListChecks, PiWarningCircle} from 'react-icons/pi'
import type {SectionState} from '../../dashboard/context/DashboardContext'

interface WorkspaceOverviewProps {
  state: SectionState
  memberCount: number
  activeTaskCount: number
  outstandingCount: number
  onRetry: () => void
}

const WorkspaceOverview = ({ state, memberCount, activeTaskCount, outstandingCount, onRetry }: WorkspaceOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatChip
        state={state}
        icon={<PiUsersThree className="w-5 h-5" />}
        label="Team members"
        value={String(memberCount)}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiListChecks className="w-5 h-5" />}
        label="Active tasks"
        value={String(activeTaskCount)}
        onRetry={onRetry}
      />
      <StatChip
        state={state}
        icon={<PiWarningCircle className="w-5 h-5" />}
        label="Outstanding items"
        value={String(outstandingCount)}
        onRetry={onRetry}
      />
    </div>
  )
}

export default WorkspaceOverview