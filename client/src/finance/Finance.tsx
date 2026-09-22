import {useFinance} from './context/FinanceContext'
import {deriveSectionState} from '../dashboard/context/DashboardContext'
import type {SectionState} from '../dashboard/context/DashboardContext'
import FinanceHeader from './components/FinanceHeader'
import FinancialSummary from './components/FinancialSummary'
import CashFlow from './components/CashFlow'
import RecentTransactions from './components/RecentTransactions'
import FinanceActions from './components/FinanceActions'

const Finance = () => {
  const {
    summary,
    cashFlow,
    transactions,
    loading,
    error,
    refreshFinance,
    __devSimulateState,
  } = useFinance();

  const summaryState = deriveSectionState(loading, error, !!summary);
  const cashFlowState = deriveSectionState(loading, error, cashFlow.length > 0);
  const transactionsState = deriveSectionState(
    loading,
    error,
    transactions.length > 0
  );

  return (
    <>
      <FinanceHeader isLoading={loading} />

      <div className="relative flex flex-col gap-6 px-4 md:px-6 py-6">
        <div className="pointer-events-none absolute -top-16 right-4 w-72 h-72 rounded-full bg-primary/30 blur-3xl -z-10" />

        {/* TEMPORARY dev state switcher — remove once refreshFinance hits a real API */}
        <div className="flex gap-2 self-end">
          {(["loading", "success", "empty", "error"] as SectionState[]).map(
            (s) => (
              <button
                key={s}
                onClick={() => __devSimulateState(s)}
                className="text-[12px] px-3 py-1 rounded-[4px] border border-primary text-white-40 hover:bg-white-4 transition-colors"
              >
                {s}
              </button>
            )
          )}
        </div>

        <FinancialSummary
          state={summaryState}
          data={summary}
          onRetry={refreshFinance}
        />

        <FinanceActions />

        <CashFlow
          state={cashFlowState}
          data={cashFlow}
          onRetry={refreshFinance}
        />

        <RecentTransactions
          state={transactionsState}
          transactions={transactions}
          onRetry={refreshFinance}
        />
      </div>
    </>
  );
};

export default Finance;
