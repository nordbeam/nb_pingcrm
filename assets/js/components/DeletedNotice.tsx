import { AlertTriangle, RotateCcw } from "lucide-react";

interface DeletedNoticeProps {
  entityName: string;
  onRestore: () => void;
}

export function DeletedNotice({ entityName, onRestore }: DeletedNoticeProps) {
  return (
    <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">
            This {entityName} has been deleted
          </p>
          <button
            type="button"
            onClick={onRestore}
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restore {entityName}
          </button>
        </div>
      </div>
    </div>
  );
}
