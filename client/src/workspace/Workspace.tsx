import {useWorkspace} from './context/WorkspaceContext'
import type {SectionState} from '../dashboard/context/DashboardContext'
import {deriveSectionState} from '../dashboard/context/DashboardContext'
import WorkspaceHeader from './components/WorkspaceHeader';
import WorkspaceOverview from './components/WorkspaceOverview';
import WorkspaceActions from './components/WorkspaceActions';
import WorkspaceTasks from './components/WorkspaceTasks';
import WorkspaceActivity from './components/WorkspaceActivity';
import WorkspaceMembers from './components/WorkspaceMembers';
import WorkspaceAnnouncements from './components/WorkspaceAnnouncements';
import WorkspaceDocuments from './components/WorkspaceDocuments';
import WorkspaceCalendar from './components/WorkspaceCalendar'; 

const Workspace = () => {
  const {
    workspace,
    members,
    tasks,
    activities,
    announcements,
    documents,
    events,
    loading,
    error,
    refreshWorkspace,
    __devSimulateState,
  } = useWorkspace();

  const overviewState = deriveSectionState(loading, error, !!workspace);
  const tasksState = deriveSectionState(loading, error, tasks.length > 0);
  const activityState = deriveSectionState(
    loading,
    error,
    activities.length > 0
  );
  const membersState = deriveSectionState(loading, error, members.length > 0);
  const announcementsState = deriveSectionState(
    loading,
    error,
    announcements.length > 0
  );
  const documentsState = deriveSectionState(
    loading,
    error,
    documents.length > 0
  );
  const eventsState = deriveSectionState(loading, error, events.length > 0);

  const activeTaskCount = tasks.filter(
    (t) => t.status === "open" || t.status === "in_progress"
  ).length;
  const outstandingCount = tasks.filter((t) => t.status === "overdue").length;

  return (
    <>
      <WorkspaceHeader
        businessName={workspace?.name}
        status={workspace?.status}
        isLoading={loading}
      />

      <div className="relative flex flex-col gap-6 px-4 md:px-6 py-6">
        <div className="pointer-events-none absolute -top-16 right-4 w-72 h-72 rounded-full bg-primary/30 blur-3xl -z-10" />

        {/* TEMPORARY dev state switcher — remove once refreshWorkspace hits a real API */}
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

        <WorkspaceOverview
          state={overviewState}
          memberCount={members.length}
          activeTaskCount={activeTaskCount}
          outstandingCount={outstandingCount}
          onRetry={refreshWorkspace}
        />

        <WorkspaceActions />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkspaceTasks
            state={tasksState}
            tasks={tasks}
            onRetry={refreshWorkspace}
          />
          <WorkspaceActivity
            state={activityState}
            activities={activities}
            onRetry={refreshWorkspace}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkspaceMembers
            state={membersState}
            members={members}
            onRetry={refreshWorkspace}
          />
          <WorkspaceAnnouncements
            state={announcementsState}
            announcements={announcements}
            onRetry={refreshWorkspace}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkspaceDocuments
            state={documentsState}
            documents={documents}
            onRetry={refreshWorkspace}
          />
          <WorkspaceCalendar
            state={eventsState}
            events={events}
            onRetry={refreshWorkspace}
          />
        </div>
      </div>
    </>
  );
};

export default Workspace;