import {Button} from '../../ui/UI'
import {PiPlusCircle, PiFileText, PiHandCoins, PiArrowsLeftRight} from 'react-icons/pi'

const FinanceActions = () => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4">
      <h2 className="text-[14px] text-white-64">Quick actions</h2>
      <div className="flex flex-wrap gap-3 ">
        <Button
          link="/dashboard/finance/transactions/new"
          variant="secondary"
          size="small"
          text="New transaction"
          icon={<PiPlusCircle className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="shrink-0 min-w-[160px] justify-center whitespace-nowrap"
        />
        <Button
          link="/dashboard/finance/invoices/new"
          variant="secondary"
          size="small"
          text="New invoice"
          icon={<PiFileText className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="flex-1 min-w-[160px] justify-center whitespace-nowrap"
        />
        <Button
          link="/dashboard/finance/payables/new"
          variant="secondary"
          size="small"
          text="New bill"
          icon={<PiHandCoins className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="flex-1 min-w-[160px] justify-center whitespace-nowrap"
        />
        <Button
          link="/dashboard/finance/reconciliation"
          variant="secondary"
          size="small"
          text="Reconcile account"
          icon={<PiArrowsLeftRight className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="flex-1 min-w-[160px] justify-center whitespace-nowrap"
        />
      </div>
    </section>
  )
}

export default FinanceActions