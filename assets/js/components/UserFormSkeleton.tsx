import { Skeleton } from '@/components/ui/skeleton';

export function UserFormSkeleton() {
  return (
    <div className="p-6">
      {/* Title */}
      <Skeleton className="h-7 w-32 mb-6" />

      <div className="space-y-5">
        {/* First Name / Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Skeleton className="h-4 w-20 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Email */}
        <div>
          <Skeleton className="h-4 w-12 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Password */}
        <div>
          <Skeleton className="h-4 w-18 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Owner checkbox */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}
