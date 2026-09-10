import { PiWarningCircle, PiArrowClockwise } from "react-icons/pi";

export type BusinessSnapshotState = "loading" | "success" | "error";

export interface BusinessSnapshotData {
  name: string;
  type: string;
  industry: string;
  transactionCount: number;
  teamSize: number;
  enabledModules: string[];
}

export interface BusinessSnapshotProps {
  state: BusinessSnapshotState;
  data?: BusinessSnapshotData;
  onRetry?: () => void;
}

const BusinessSnapshot = ({ state, data, onRetry }: BusinessSnapshotProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Business snapshot</h2>

      {state === "loading" && (
        <div className="grid grid-cols-2 gap-4 animate-pulse">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">
            Couldn't load your business snapshot.
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

      {state === "success" && data && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white-64">Business</span>
            <span className="text-[14px] text-white-80 truncate">
              {data.name}
            </span>
            <span className="text-[12px] text-white-40 truncate">
              {data.type} · {data.industry}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white-64">Transactions</span>
            <span className="text-[14px] text-white-80">
              {data.transactionCount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white-64">Team size</span>
            <span className="text-[14px] text-white-80">{data.teamSize}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white-64">Modules</span>
            {data.enabledModules.length > 0 ? (
              <span className="text-[14px] text-white-80 truncate">
                {data.enabledModules.join(", ")}
              </span>
            ) : (
              <span className="text-[12px] text-white-40">
                None enabled yet
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BusinessSnapshot;
