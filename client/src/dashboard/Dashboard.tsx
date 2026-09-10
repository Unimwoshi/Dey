import { useState, useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHeader from "./components/DashboardHeader";
import FinancialOverview from "./components/FinancialOverview";
import AttentionPanel from "./components/AttentionPanel";
import BusinessSnapshot from "./components/BusinessSnapshot";
import RecentActivity from "./components/RecentActivity";
import StatChip from "./components/StatChip";
import { useDashboard, deriveSectionState } from "./context/DashboardContext";
import type { SectionState } from "./context/DashboardContext";
import {
  mockTrend,
  mockBusinessSnapshot,
  mockActivity,
} from "../data/mockDashboardData";
import { mockAttentionItems } from "../data/mockAttentionItems";
import { PiCurrencyNgn, PiReceipt, PiClockCountdown } from "react-icons/pi";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  else if (hour < 18) return "Good afternoon";
  else return "Good evening";
}

function useGreeting(): string {
  const [greeting, setGreeting] = useState<string>(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return greeting;
}

const Dashboard = () => {
  const greeting = useGreeting();
  const {
    user,
    currentBusiness,
    dashboardPeriod,
    financials,
    attentionItems,
    businessSnapshot,
    recentActivity,
    loading,
    error,
    refreshDashboard,
    __devSimulateState,
  } = useDashboard();

  const financialState = deriveSectionState(loading, error, !!financials);
  const attentionState = deriveSectionState(
    loading,
    error,
    attentionItems.length > 0
  );
  // BusinessSnapshot has no empty state — collapses to loading/error/success.
  const snapshotState = loading ? "loading" : error ? "error" : "success";
  const activityState = deriveSectionState(
    loading,
    error,
    recentActivity.length > 0
  );

  return (
    <DashboardLayout>
      <DashboardHeader
        firstName={user.firstName}
        businessName={currentBusiness.name}
        unreadNotifications={2}
        isLoading={loading}
        onSignOut={() => {}}
      />

      <div className="relative flex flex-col gap-6 px-4 md:px-6 py-6">
        <div className="pointer-events-none absolute -top-16 right-4 w-72 h-72 rounded-full bg-primary/30 blur-3xl -z-10" />

        {/* TEMPORARY dev state switcher — remove once refreshDashboard hits a real API */}
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

        <div>
          <h1 className="text-[28px] md:text-[36px] font-bold text-white-80">
            {greeting}, {user.firstName}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FinancialOverview
              state={financialState}
              period={dashboardPeriod}
              netIncome={financials?.netIncome}
              revenue={financials?.revenue}
              expenses={financials?.expenses}
              trend={financials?.trend}
              onRetry={refreshDashboard}
            />
          </div>

          <div className="flex flex-col gap-4">
            <StatChip
              state={financialState}
              icon={<PiCurrencyNgn className="w-5 h-5" />}
              label="Monthly Revenue"
              value={
                financials
                  ? `\u20A6${financials.revenue.toLocaleString()}`
                  : undefined
              }
              onRetry={refreshDashboard}
            />
            <StatChip
              state={snapshotState}
              icon={<PiReceipt className="w-5 h-5" />}
              label="Transactions"
              value={
                businessSnapshot
                  ? String(businessSnapshot.transactionCount)
                  : undefined
              }
              onRetry={refreshDashboard}
            />
            <StatChip
              state={attentionState}
              icon={<PiClockCountdown className="w-5 h-5" />}
              label="Pending Invoices"
              value={
                attentionItems.length > 0
                  ? String(attentionItems.length)
                  : undefined
              }
              onRetry={refreshDashboard}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttentionPanel
            state={attentionState}
            items={attentionItems}
            onRetry={refreshDashboard}
          />
          <BusinessSnapshot
            state={snapshotState}
            data={businessSnapshot ?? undefined}
            onRetry={refreshDashboard}
          />
        </div>

        <RecentActivity
          state={activityState}
          activities={recentActivity}
          onRetry={refreshDashboard}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
