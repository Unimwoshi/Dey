import {Button} from '../../ui/UI'
import {PiPlus} from 'react-icons/pi'

interface FinanceHeaderProps {
  isLoading?: boolean
}

const FinanceHeader = ({ isLoading = false }: FinanceHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-6 h-[64px] border-b border-white-8 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {isLoading ? (
          <div className="h-4 w-32 bg-white-8 rounded animate-pulse" />
        ) : (
          <h1 className="text-[16px] md:text-[18px] text-white-80 font-semibold truncate">Finance</h1>
        )}
      </div>

      <Button
        link="/dashboard/finance/transactions/new"
        text="New transaction"
        variant="primary"
        size="small"
        icon={<PiPlus className="w-4 h-4" />}
        iconPosition="leading"
        disabled={isLoading}
      />
    </header>
  )
}

export default FinanceHeader