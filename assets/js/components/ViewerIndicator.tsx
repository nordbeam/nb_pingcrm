import { useRecordPresence } from "@/hooks/useRecordPresence";
import { Eye } from "lucide-react";

interface ViewerIndicatorProps {
  type: "contact" | "organization" | "user";
  id: number;
}

/**
 * Shows who else is currently viewing this record.
 * Displays avatar badges for each viewer with their initials.
 */
export function ViewerIndicator({ type, id }: ViewerIndicatorProps) {
  const { viewers, isBeingViewedByOthers } = useRecordPresence({ type, id });

  if (!isBeingViewedByOthers) {
    return null;
  }

  const maxDisplay = 3;
  const displayViewers = viewers.slice(0, maxDisplay);
  const remainingCount = viewers.length - maxDisplay;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-800/50 dark:bg-amber-900/20">
      <Eye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <div className="flex items-center gap-1">
        <span className="text-sm text-amber-800 dark:text-amber-200">
          Also viewing:
        </span>
        <div className="flex -space-x-2 ml-1">
          {displayViewers.map((viewer) => (
            <div
              key={viewer.userId}
              className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-50 bg-amber-100 text-xs font-medium text-amber-700 dark:border-amber-900/20 dark:bg-amber-800/50 dark:text-amber-200"
              title={`${viewer.name} (${viewer.email})`}
            >
              {viewer.initials}
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-amber-50 bg-green-500 dark:border-amber-900/20" />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-50 bg-amber-200 text-xs font-medium text-amber-700 dark:border-amber-900/20 dark:bg-amber-700 dark:text-amber-200">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact viewer indicator showing just avatars and count.
 * Use this for tighter layouts like table cells or headers.
 */
export function ViewerBadges({ type, id }: ViewerIndicatorProps) {
  const { viewers, isBeingViewedByOthers, viewerCount } = useRecordPresence({
    type,
    id,
  });

  if (!isBeingViewedByOthers) {
    return null;
  }

  const maxDisplay = 2;
  const displayViewers = viewers.slice(0, maxDisplay);
  const remainingCount = viewers.length - maxDisplay;

  return (
    <div className="flex items-center gap-1" title={`${viewerCount} viewer${viewerCount > 1 ? "s" : ""}`}>
      <div className="flex -space-x-1.5">
        {displayViewers.map((viewer) => (
          <div
            key={viewer.userId}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-primary/10 text-[10px] font-medium text-primary"
            title={viewer.name}
          >
            {viewer.initials}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-muted text-[10px] font-medium text-muted-foreground">
            +{remainingCount}
          </div>
        )}
      </div>
      <Eye className="h-3 w-3 text-muted-foreground" />
    </div>
  );
}
