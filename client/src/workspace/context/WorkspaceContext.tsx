import {createContext, useContext, useState, useCallback, ReactNode} from 'react'
import type {Workspace, WorkspaceMember, WorkspaceTask, WorkspaceActivity,
  WorkspaceAnnouncement, WorkspaceDocument, WorkspaceEvent} from '../types'
import {mockWorkspace, mockMembers, mockTasks, mockWorkspaceActivities,
  mockAnnouncements, mockDocuments, mockEvents} from '../../data/mockWorkspaceData'
import type {SectionState} from '../../dashboard/context/DashboardContext'
import { deriveSectionState } from "../../dashboard/context/DashboardContext";


interface WorkspaceContextValue {
  workspace: Workspace | null
  members: WorkspaceMember[]
  tasks: WorkspaceTask[]
  activities: WorkspaceActivity[]
  announcements: WorkspaceAnnouncement[]
  documents: WorkspaceDocument[]
  events: WorkspaceEvent[]

  loading: boolean
  error: string | null
  refreshWorkspace: () => void

  // TEMPORARY — dev-only. Delete once refreshWorkspace() talks to a backend.
  __devSimulateState: (state: SectionState) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined)

interface WorkspaceProviderProps {
  children: ReactNode
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [workspace, setWorkspace] = useState<Workspace | null>(mockWorkspace)
  const [members, setMembers] = useState<WorkspaceMember[]>(mockMembers)
  const [tasks, setTasks] = useState<WorkspaceTask[]>(mockTasks)
  const [activities, setActivities] = useState<WorkspaceActivity[]>(mockWorkspaceActivities)
  const [announcements, setAnnouncements] = useState<WorkspaceAnnouncement[]>(mockAnnouncements)
  const [documents, setDocuments] = useState<WorkspaceDocument[]>(mockDocuments)
  const [events, setEvents] = useState<WorkspaceEvent[]>(mockEvents)

  const refreshWorkspace = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setWorkspace(mockWorkspace)
      setMembers(mockMembers)
      setTasks(mockTasks)
      setActivities(mockWorkspaceActivities)
      setAnnouncements(mockAnnouncements)
      setDocuments(mockDocuments)
      setEvents(mockEvents)
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
      setError('Failed to load workspace data.')
      return
    }
    setError(null)

    if (state === 'empty') {
      setMembers([])
      setTasks([])
      setActivities([])
      setAnnouncements([])
      setDocuments([])
      setEvents([])
      return
    }

    // success
    setMembers(mockMembers)
    setTasks(mockTasks)
    setActivities(mockWorkspaceActivities)
    setAnnouncements(mockAnnouncements)
    setDocuments(mockDocuments)
    setEvents(mockEvents)
  }, [])

  const value: WorkspaceContextValue = {
    workspace,
    members,
    tasks,
    activities,
    announcements,
    documents,
    events,
    loading,
    error,
    refreshWorkspace,
    __devSimulateState,
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return ctx
}