import {Button} from '../../ui/UI'
import {PiPlus} from 'react-icons/pi'

interface WorkspaceHeaderProps {
  businessName?: string;
  status?: "active" | "setting_up";
  isLoading?: boolean;
}

const WorkspaceHeader = ({
  businessName,
  status = "active",
  isLoading = false,
}: WorkspaceHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-6 h-[64px] border-b border-white-8 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {isLoading ? (
          <div className="h-4 w-40 bg-white-8 rounded animate-pulse" />
        ) : (
          <>
            <h1 className="text-[16px] md:text-[18px] text-white-80 font-semibold truncate">
              Workspace
            </h1>
            {businessName && (
              <span className="text-[12px] text-white-64 truncate hidden sm:inline">
                · {businessName}
              </span>
            )}
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-white-8 text-white-64"
              }`}
            >
              {status === "active" ? "Active" : "Setting up"}
            </span>
          </>
        )}
      </div>

      <Button
        text="New task"
        variant="primary"
        size="small"
        icon={<PiPlus className="w-4 h-4" />}
        iconPosition="leading"
        disabled={isLoading}
      />
    </header>
  );
};

export default WorkspaceHeader;
