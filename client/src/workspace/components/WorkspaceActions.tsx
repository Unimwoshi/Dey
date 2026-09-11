import {Button} from '../../ui/UI'
import {PiPlusCircle, PiFileText, PiMinusCircle, PiHandCoins, PiUserPlus} from 'react-icons/pi'

const WorkspaceActions = () => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4">
      <h2 className="text-[14px] text-white-64">Quick actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Button
          link="/dashboard/finance/transactions/new"
          variant="secondary"
          size="small"
          text="Add transaction"
          icon={<PiPlusCircle className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="w-full justify-center"
        />
        <Button
          link="/dashboard/finance/invoices/new"
          variant="secondary"
          size="small"
          text="Create invoice"
          icon={<PiFileText className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="w-full justify-center"
        />
        <Button
          link="/dashboard/finance/transactions/new?type=expense"
          variant="secondary"
          size="small"
          text="Add expense"
          icon={<PiMinusCircle className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="w-full justify-center"
        />
        <Button
          link="/dashboard/finance/payables"
          variant="secondary"
          size="small"
          text="Record payment"
          icon={<PiHandCoins className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="w-full justify-center"
        />
        <Button
          link="/dashboard/team?invite=true"
          variant="secondary"
          size="small"
          text="Invite member"
          icon={<PiUserPlus className="w-4 h-4" />}
          iconPosition="leading"
          customClassName="w-full justify-center"
        />
      </div>
    </section>
  );
};

export default WorkspaceActions;