import {
  PiWarningCircle,
  PiArrowClockwise,
  PiClockCounterClockwise,
} from "react-icons/pi";

export type RecentActivityState = "loading" | "success" | "empty" | "error";

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export interface RecentActivityProps {
  state: RecentActivityState;
  activities?: ActivityItem[];
  onRetry?: () => void;
}

function formatAmount(amount: number) {
  const sign = amount < 0 ? "-" : "";
  return `${sign}\u20A6${Math.abs(amount).toLocaleString()}`;
}

const RecentActivity = ({
  state,
  activities = [],
  onRetry,
}: RecentActivityProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Recent activity</h2>

      {state === "loading" && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">
            Couldn't load recent activity.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-[4px] bg-white-4 border border-primary hover:bg-white-8 text-white-80 text-[14px] transition-colors"
          >
            <PiArrowClockwise className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {state === "empty" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center py-6">
          <PiClockCounterClockwise className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No activity yet</p>
          <p className="text-white-64 text-[12px] max-w-[240px]">
            Payments, expenses, invoices, and team activity will show up here
            once things start moving.
          </p>
        </div>
      )}

      {state === "success" && (
        <ul className="flex flex-col gap-1">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-center justify-between gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-[14px] text-white-80 truncate">
                  {activity.description}
                </p>
                <p className="text-[12px] text-white-64">
                  {activity.timestamp}
                </p>
              </div>
              {activity.amount !== undefined && (
                <span
                  className={`text-[14px] shrink-0 ${
                    activity.amount < 0 ? "text-fail" : "text-success"
                  }`}
                >
                  {formatAmount(activity.amount)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;
