import {PiWarningCircle, PiArrowClockwise, PiListChecks} from 'react-icons/pi'
import type WorkspaceTask from '../types'
import type {SectionState} from '../../dashboard/context/DashboardContext'

interface WorkspaceTasksProps {
  state: SectionState;
  tasks: WorkspaceTask[];
  onRetry: () => void;
}

function statusBadgeClasses(status: WorkspaceTask["status"]) {
  switch (status) {
    case "open":
      return "bg-white-8 text-white-64";
    case "in_progress":
      return "bg-accent/10 text-accent";
    case "done":
      return "bg-success/10 text-success";
    case "overdue":
      return "bg-fail/10 text-fail";
  }
}

function statusLabel(status: WorkspaceTask["status"]) {
  switch (status) {
    case "open":
      return "Open";
    case "in_progress":
      return "In progress";
    case "done":
      return "Done";
    case "overdue":
      return "Overdue";
  }
}

function priorityDotClasses(priority: WorkspaceTask["priority"]) {
  switch (priority) {
    case "low":
      return "bg-success";
    case "medium":
      return "bg-white-40";
    case "high":
      return "bg-fail";
  }
}

const WorkspaceTasks = ({ state, tasks, onRetry }: WorkspaceTasksProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <h2 className="text-[14px] text-white-64">Tasks</h2>

      {state === "loading" && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 w-full bg-white-8 rounded" />
          ))}
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center py-4">
          <PiWarningCircle className="w-6 h-6 text-fail" />
          <p className="text-white-80 text-[14px]">Couldn't load tasks.</p>
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
          <PiListChecks className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No tasks yet</p>
          <p className="text-white-64 text-[12px] max-w-[240px]">
            Tasks assigned to your team will show up here.
          </p>
        </div>
      )}

      {state === "success" && (
        <ul className="flex flex-col gap-1">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-[4px] px-2 py-2 hover:bg-white-8 transition-colors"
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${priorityDotClasses(
                  task.priority
                )}`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-white-80 truncate">
                  {task.title}
                </p>
                <p className="text-[12px] text-white-64">
                  {task.assigneeName} · Due {task.dueDate}
                </p>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${statusBadgeClasses(
                  task.status
                )}`}
              >
                {statusLabel(task.status)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default WorkspaceTasks;
