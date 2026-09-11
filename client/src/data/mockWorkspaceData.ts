import type {Workspace, WorkspaceMember, WorkspaceTask,
 WorkspaceActivity, WorkspaceAnnouncement, WorkspaceDocument, WorkspaceEvent} from '../workspace/types'

export const mockWorkspace: Workspace = {
  id: 'biz_1',
  name: "Grace's Boutique",
  status: 'active',
}

export const mockMembers: WorkspaceMember[] = [
  { id: 'm1', name: 'Grace A.', role: 'Owner', online: true },
  { id: 'm2', name: 'Tunde A.', role: 'Manager', online: true },
  { id: 'm3', name: 'Amaka T.', role: 'Sales', online: false },
  { id: 'm4', name: 'Chidi O.', role: 'Inventory', online: false },
]

export const mockTasks: WorkspaceTask[] = [
  { id: 't1', title: 'Restock Ankara fabric', assigneeName: 'Chidi O.', dueDate: 'Today', status: 'in_progress', priority: 'high' },
  { id: 't2', title: 'Reply to wholesale inquiry', assigneeName: 'Grace A.', dueDate: 'Tomorrow', status: 'open', priority: 'medium' },
  { id: 't3', title: 'Update price list', assigneeName: 'Amaka T.', dueDate: 'Sep 8', status: 'overdue', priority: 'high' },
  { id: 't4', title: 'Prepare weekend promo post', assigneeName: 'Tunde A.', dueDate: 'Sep 12', status: 'done', priority: 'low' },
]

export const mockWorkspaceActivities: WorkspaceActivity[] = [
  { id: 'a1', type: 'financial', description: 'Invoice #0032 marked as paid', timestamp: '1 hour ago' },
  { id: 'a2', type: 'task', description: "Chidi O. started 'Restock Ankara fabric'", timestamp: '3 hours ago' },
  { id: 'a3', type: 'team', description: 'Tunde A. joined the workspace', timestamp: 'Yesterday' },
  { id: 'a4', type: 'business', description: 'Business hours updated', timestamp: '2 days ago' },
]

export const mockAnnouncements: WorkspaceAnnouncement[] = [
  { id: 'an1', title: 'New store hours starting October', body: "We'll now open at 9am on weekdays. Please update your schedules.", author: 'Grace A.', timestamp: '2 days ago', pinned: true },
  { id: 'an2', title: 'Inventory count this weekend', body: 'Full stock count Saturday morning — all hands needed.', author: 'Tunde A.', timestamp: '4 days ago' },
]

export const mockDocuments: WorkspaceDocument[] = [
  { id: 'd1', name: 'Supplier agreement - Ankara Co.pdf', sizeLabel: '1.2 MB', uploadedBy: 'Grace A.', uploadedAt: 'Sep 3' },
  { id: 'd2', name: 'Q3 sales summary.xlsx', sizeLabel: '480 KB', uploadedBy: 'Tunde A.', uploadedAt: 'Sep 1' },
  { id: 'd3', name: 'Store lease.pdf', sizeLabel: '2.1 MB', uploadedBy: 'Grace A.', uploadedAt: 'Aug 20' },
]

export const mockEvents: WorkspaceEvent[] = [
  { id: 'e1', title: 'Supplier call', date: 'Today', time: '2:00 PM' },
  { id: 'e2', title: 'Inventory count', date: 'Sat, Sep 13', time: '9:00 AM' },
  { id: 'e3', title: 'Rent due', date: 'Oct 1', time: 'All day' },
]