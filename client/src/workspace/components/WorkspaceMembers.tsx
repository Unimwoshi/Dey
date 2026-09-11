import {PiWarningCircle, PiArrowClockwise, PiUsersThree, PiUser} from 'react-icons/pi'
import type {WorkspaceMember} from '../types'
import type {SectionState} from '../../dashboard/context/DashboardContext'

interface WorkspaceMembersProps {
  state: SectionState
  members: WorkspaceMember[]
  onRetry: () => void
}

const WorkspaceMembers = ({ state, members, onRetry }: WorkspaceMembersProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Members</h2>

      {state === 'loading' && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-10 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load members.</p>
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
          <PiUsersThree className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No members yet</p>
          <p className="text-white-64 text-[12px]">Invite your team to get started.</p>
        </div>
      )}

      {state === 'success' && (
        <ul className="flex flex-col gap-1">
          {members.map((member) => (
            <li key={member.id} className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors">
              <span className="relative w-8 h-8 rounded-full bg-white-8 flex items-center justify-center shrink-0 overflow-hidden">
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <PiUser className="w-4 h-4 text-white-64" />
                )}
                <span
                  className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-bg-primary ${
                    member.online ? 'bg-success' : 'bg-white-40'
                  }`}
                />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] text-white-80 truncate">{member.name}</p>
                <p className="text-[12px] text-white-64">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkspaceMembers