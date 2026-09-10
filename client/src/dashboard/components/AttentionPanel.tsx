import { Link } from "react-router-dom";
import {
  PiWarningCircle,
  PiArrowClockwise,
  PiCheckCircle,
  PiCaretRight,
} from "react-icons/pi";

export type AttentionPanelState = "loading" | "success" | "empty" | "error";

export interface AttentionItem {
  id: string;
  label: string;
  detail: string;
  href: string;
  icon: React.ReactNode;
}

export interface AttentionPanelProps {
  state: AttentionPanelState;
  items?: AttentionItem[];
  onRetry?: () => void;
}

const AttentionPanel = ({
  state,
  items = [],
  onRetry,
}: AttentionPanelProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Needs your attention</h2>

      {state === "loading" && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-10 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">
            Couldn't load your attention items.
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
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center py-4">
          <PiCheckCircle className="w-6 h-6 text-success" />
          <p className="text-white-80 text-[14px]">You're all caught up</p>
          <p className="text-white-64 text-[12px]">
            Nothing needs your attention right now.
          </p>
        </div>
      )}

      {state === "success" && (
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className="flex items-center gap-3 rounded-[4px] px-2 py-2 hover:bg-white-8 transition-colors"
              >
                <span className="text-white-64 shrink-0">{item.icon}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] text-white-80 truncate">
                    {item.label}
                  </span>
                  <span className="block text-[12px] text-white-64 truncate">
                    {item.detail}
                  </span>
                </span>
                <PiCaretRight className="w-4 h-4 text-white-40 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AttentionPanel;
