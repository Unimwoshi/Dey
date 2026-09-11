import {PiFile, PiFolderOpen,PiWarningCircle, PiArrowClockwise} from 'react-icons/pi'
import type {WorkspaceDocument} from '../types'
import type { SectionState } from "../../dashboard/context/DashboardContext";

interface WorkspaceDocumentsProps {
  state: SectionState;
  documents: WorkspaceDocument[];
  onRetry: () => void;
}

const WorkspaceDocuments = ({
  state,
  documents,
  onRetry,
}: WorkspaceDocumentsProps) => {
  return (
    <section className="bg-white-4 rounded border border-primary p-6 flex flex-col gap-4 min-h-[220px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] text-white-64">Documents</h2>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white-8 text-white-40">
          Preview
        </span>
      </div>

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
          <p className="text-white-80 text-[14px]">Couldn't load documents.</p>
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
          <PiFolderOpen className="w-6 h-6 text-white-40" />
          <p className="text-white-80 text-[14px]">No documents yet</p>
        </div>
      )}

      {state === "success" && (
        <ul className="flex flex-col gap-1">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white-8 flex items-center justify-center shrink-0 text-white-64">
                <PiFile className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-white-80 truncate">{doc.name}</p>
                <p className="text-[12px] text-white-64">
                  {doc.uploadedBy} · {doc.uploadedAt}
                </p>
              </div>
              <span className="text-[11px] text-white-40 shrink-0">
                {doc.sizeLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default WorkspaceDocuments;