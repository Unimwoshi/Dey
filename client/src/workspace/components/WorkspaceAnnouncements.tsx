import {PiMegaphone, PiPushPin, PiWarningCircle, PiArrowClockwise} from 'react-icons/pi'
import type {WorkspaceAnnouncement} from '../types'
import type  {SectionState} from '../../dashboard/context/DashboardContext'

interface WorkspaceAnnouncementsProps {
  state: SectionState
  announcements: WorkspaceAnnouncement[]
  onRetry: () => void
}

const WorkspaceAnnouncements = ({ state, announcements, onRetry }: WorkspaceAnnouncementsProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] text-white-64">Announcements</h2>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white-8 text-white-40">Preview</span>
      </div>

      {state === 'loading' && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1].map((i) => (
            <div key={i} className="h-16 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load announcements.</p>
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
          <PiMegaphone className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No announcements yet</p>
        </div>
      )}

      {state === 'success' && (
        <ul className="flex flex-col gap-3">
          {announcements.map((a) => (
            <li key={a.id} className="rounded-[4px] bg-white-4 border border-white-8 p-3 hover:bg-white-8 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                {a.pinned && <PiPushPin className="w-3.5 h-3.5 text-accent shrink-0" />}
                <p className="text-[14px] text-white-80 truncate">{a.title}</p>
              </div>
              <p className="text-[12px] text-white-64 mb-2">{a.body}</p>
              <p className="text-[11px] text-white-40">{a.author} · {a.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkspaceAnnouncements