import { PiReceipt, PiMagnifyingGlass, PiUserPlus } from 'react-icons/pi'
import type { AttentionItem } from '../components/AttentionPanel'

export const mockAttentionItems: AttentionItem[] = [
  {
    id: 'overdue-invoices',
    label: '3 overdue invoices',
    detail: 'Follow up to get paid',
    href: '/dashboard/finances/invoices?status=overdue',
    icon: <PiReceipt className="w-4 h-4" />,
  },
  {
    id: 'review-transactions',
    label: '5 transactions need review',
    detail: 'Categorize or confirm these',
    href: '/dashboard/finances/transactions?status=review',
    icon: <PiMagnifyingGlass className="w-4 h-4" />,
  },
  {
    id: 'pending-invitations',
    label: '1 pending invitation',
    detail: 'Waiting on a response',
    href: '/dashboard/team?tab=invitations',
    icon: <PiUserPlus className="w-4 h-4" />,
  },
]