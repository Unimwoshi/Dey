import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { FinancialTrendPoint } from "../components/FinancialOverview";
import type { AttentionItem } from "../components/AttentionPanel";
import type { BusinessSnapshotData } from "../components/BusinessSnapshot";
import type { ActivityItem } from "../components/RecentActivity";
import {
  mockTrend,
  mockBusinessSnapshot,
  mockActivity,
} from "../../data/mockDashboardData";
import { mockAttentionItems } from "../../data/mockAttentionItems";

export interface UserInfo {
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface BusinessInfo {
  id: string;
  name: string;
}

export interface FinancialData {
  netIncome: number;
  revenue: number;
  expenses: number;
  trend: FinancialTrendPoint[];
}

export type SectionState = "loading" | "success" | "empty" | "error";

export function deriveSectionState(
  loading: boolean,
  error: string | null,
  hasData: boolean
): SectionState {
  if (loading) return "loading";
  if (error) return "error";
  if (!hasData) return "empty";
  return "success";
}

interface DashboardContextValue {
  user: UserInfo;
  currentBusiness: BusinessInfo;
  dashboardPeriod: string;
  setDashboardPeriod: (period: string) => void;

  financials: FinancialData | null;
  attentionItems: AttentionItem[];
  businessSnapshot: BusinessSnapshotData | null;
  recentActivity: ActivityItem[];

  loading: boolean;
  error: string | null;
  refreshDashboard: () => void;

  // TEMPORARY — dev-only helper so pages can preview loading/empty/error
  // states before a real API exists. Delete once refreshDashboard() talks
  // to a backend, along with any dev switcher UI calling this.
  __devSimulateState: (state: SectionState) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [dashboardPeriod, setDashboardPeriod] = useState("This month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [financials, setFinancials] = useState<FinancialData | null>({
    netIncome: 190000,
    revenue: 600000,
    expenses: 410000,
    trend: mockTrend,
  });
  const [attentionItems, setAttentionItems] =
    useState<AttentionItem[]>(mockAttentionItems);
  const [businessSnapshot, setBusinessSnapshot] =
    useState<BusinessSnapshotData | null>(mockBusinessSnapshot);
  const [recentActivity, setRecentActivity] =
    useState<ActivityItem[]>(mockActivity);

  // Placeholder until OnboardingContext persists real values (checklist §11).
  const user: UserInfo = { firstName: "Woshi" };
  const currentBusiness: BusinessInfo = {
    id: "biz_1",
    name: "Grace's Boutique",
  };

  const refreshDashboard = useCallback(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setFinancials({
        netIncome: 190000,
        revenue: 600000,
        expenses: 410000,
        trend: mockTrend,
      });
      setAttentionItems(mockAttentionItems);
      setBusinessSnapshot(mockBusinessSnapshot);
      setRecentActivity(mockActivity);
      setLoading(false);
    }, 600);
  }, []);

  const __devSimulateState = useCallback((state: SectionState) => {
    if (state === "loading") {
      setLoading(true);
      setError(null);
      return;
    }
    setLoading(false);

    if (state === "error") {
      setError("Failed to load dashboard data.");
      return;
    }
    setError(null);

    if (state === "empty") {
      setFinancials(null);
      setAttentionItems([]);
      setRecentActivity([]);
      // businessSnapshot intentionally untouched — it has no empty state.
      return;
    }

    // success
    setFinancials({
      netIncome: 190000,
      revenue: 600000,
      expenses: 410000,
      trend: mockTrend,
    });
    setAttentionItems(mockAttentionItems);
    setBusinessSnapshot(mockBusinessSnapshot);
    setRecentActivity(mockActivity);
  }, []);

  const value: DashboardContextValue = {
    user,
    currentBusiness,
    dashboardPeriod,
    setDashboardPeriod,
    financials,
    attentionItems,
    businessSnapshot,
    recentActivity,
    loading,
    error,
    refreshDashboard,
    __devSimulateState,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
}
