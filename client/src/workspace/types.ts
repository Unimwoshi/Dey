export interface Workspace {
    id: string
    name: string
    status: 'active' | 'setting_up'
  }
  
  export interface WorkspaceMember {
    id: string
    name: string
    avatarUrl?: string
    role: string
    online: boolean
  }
  
  export type TaskStatus = 'open' | 'in_progress' | 'done' | 'overdue'
  export type TaskPriority = 'low' | 'medium' | 'high'
  
  export interface WorkspaceTask {
    id: string
    title: string
    assigneeName: string
    dueDate: string
    status: TaskStatus
    priority: TaskPriority
  }
  
  export interface WorkspaceActivity {
    id: string
    type: 'financial' | 'team' | 'task' | 'business'
    description: string
    timestamp: string
  }
  
  export interface WorkspaceAnnouncement {
    id: string
    title: string
    body: string
    author: string
    timestamp: string
    pinned?: boolean
  }
  
  export interface WorkspaceDocument {
    id: string
    name: string
    sizeLabel: string
    uploadedBy: string
    uploadedAt: string
  }
  
  export interface WorkspaceEvent {
    id: string
    title: string
    date: string
    time: string
  }