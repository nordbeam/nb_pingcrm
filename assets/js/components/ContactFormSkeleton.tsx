import { Skeleton } from "@/components/ui/skeleton";

export function ContactFormSkeleton() {
  return (
    <div className="p-6">
      {/* Title */}
      <Skeleton className="h-7 w-40 mb-6" />

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

        {/* Organization */}
        <div>
          <Skeleton className="h-4 w-24 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email / Phone */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Skeleton className="h-4 w-12 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-14 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Address */}
        <div>
          <Skeleton className="h-4 w-16 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* City / Region */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Skeleton className="h-4 w-10 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-28 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Country / Postal Code */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Skeleton className="h-4 w-16 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-1.5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
