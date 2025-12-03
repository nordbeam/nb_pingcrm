/**
 * NbFlop Pagination Component (Page-based)
 *
 * A pagination component for page-based pagination with Flop.
 * Uses shadcn/ui Button for consistent styling.
 *
 * @example
 * ```tsx
 * <Pagination
 *   meta={meta}
 *   onPageChange={(page) => flop.setPage(page)}
 * />
 * ```
 */

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaginationProps } from "./types";
import { cn } from "@/lib/utils";

/**
 * Generate page numbers to display with ellipsis
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
  const half = Math.floor(maxVisible / 2);

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  // Adjust if at start or end
  if (currentPage <= half + 1) {
    end = Math.min(totalPages - 1, maxVisible - 1);
  } else if (currentPage >= totalPages - half) {
    start = Math.max(2, totalPages - maxVisible + 2);
  }

  // Add ellipsis if needed before
  if (start > 2) {
    pages.push("ellipsis-start");
  }

  // Add page numbers
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis if needed after
  if (end < totalPages - 1) {
    pages.push("ellipsis-end");
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export function Pagination({
  meta,
  onPageChange,
  className = "",
  showPageNumbers = true,
  maxVisiblePages = 7,
  labels = {},
}: PaginationProps) {
  const {
    previous = "Previous",
    next = "Next",
    page = (current, total) => `Page ${current} of ${total}`,
  } = labels;

  const currentPage = meta.currentPage ?? 1;
  const totalPages = meta.totalPages ?? 1;

  const pageNumbers = showPageNumbers
    ? getPageNumbers(currentPage, totalPages, maxVisiblePages)
    : [];

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
      role="navigation"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => meta.previousPage && onPageChange(meta.previousPage)}
        disabled={!meta.hasPreviousPage}
        aria-label={previous}
        className="h-8 gap-1 px-2.5"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{previous}</span>
      </Button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1" role="list">
          {pageNumbers.map((pageNum) =>
            pageNum === "ellipsis-start" || pageNum === "ellipsis-end" ? (
              <span
                key={pageNum}
                className="flex h-8 w-8 items-center justify-center text-muted-foreground"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                aria-current={pageNum === currentPage ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
                className={cn(
                  "h-8 w-8 p-0",
                  pageNum === currentPage &&
                    "pointer-events-none"
                )}
              >
                {pageNum}
              </Button>
            )
          )}
        </div>
      )}

      {/* Page Info (when not showing numbers) */}
      {!showPageNumbers && (
        <span className="px-4 text-sm text-muted-foreground">
          {page(currentPage, totalPages)}
        </span>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => meta.nextPage && onPageChange(meta.nextPage)}
        disabled={!meta.hasNextPage}
        aria-label={next}
        className="h-8 gap-1 px-2.5"
      >
        <span className="hidden sm:inline">{next}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

export default Pagination;
