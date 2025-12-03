/**
 * NbFlop SortableColumnHeader Component
 *
 * A column header component for TanStack Table that integrates with Flop
 * for server-side sorting. Use this in column definitions.
 *
 * @example In column definitions
 * ```tsx
 * import { SortableColumnHeader } from '@/components/flop';
 * import type { ColumnDef } from '@tanstack/react-table';
 *
 * export const columns: ColumnDef<User>[] = [
 *   {
 *     accessorKey: 'name',
 *     header: ({ column }) => (
 *       <SortableColumnHeader field="name">
 *         Name
 *       </SortableColumnHeader>
 *     ),
 *   },
 *   {
 *     accessorKey: 'email',
 *     header: ({ column }) => (
 *       <SortableColumnHeader field="email">
 *         Email
 *       </SortableColumnHeader>
 *     ),
 *   },
 * ];
 * ```
 *
 * @example With custom icons
 * ```tsx
 * import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
 *
 * <SortableColumnHeader
 *   field="name"
 *   ascIcon={<ArrowUp className="h-4 w-4" />}
 *   descIcon={<ArrowDown className="h-4 w-4" />}
 *   unsortedIcon={<ArrowUpDown className="h-4 w-4" />}
 * >
 *   Name
 * </SortableColumnHeader>
 * ```
 */

import * as React from 'react';
import { useDataTableContext } from './DataTable';
import type { SortDirection } from './types';

export interface SortableColumnHeaderProps {
  /** The field name to sort by (should match Flop schema sortable field) */
  field: string;
  /** Column header content */
  children: React.ReactNode;
  /** Icon for ascending sort */
  ascIcon?: React.ReactNode;
  /** Icon for descending sort */
  descIcon?: React.ReactNode;
  /** Icon for unsorted state */
  unsortedIcon?: React.ReactNode;
  /** Additional className for the button */
  className?: string;
}

/**
 * SortableColumnHeader - Use in TanStack Table column definitions
 *
 * This component uses the DataTableContext to access sort state and handlers.
 * Make sure to pass onSortChange and getSortDirection to the parent DataTable.
 */
export function SortableColumnHeader({
  field,
  children,
  ascIcon,
  descIcon,
  unsortedIcon,
  className = '',
}: SortableColumnHeaderProps) {
  const { onSortChange, getSortDirection } = useDataTableContext();

  const direction = getSortDirection?.(field) ?? null;
  const isActive = direction !== null;

  const handleClick = () => {
    if (!onSortChange) {
      return;
    }

    let newDirection: SortDirection;
    if (!isActive) {
      newDirection = 'asc';
    } else if (direction === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }

    onSortChange(field, newDirection);
  };

  // Default icons using Unicode arrows
  const defaultAscIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );

  const defaultDescIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 5v14" />
      <path d="m5 12 7 7 7-7" />
    </svg>
  );

  const defaultUnsortedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 opacity-50"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );

  const getIcon = () => {
    if (direction === 'asc') return ascIcon ?? defaultAscIcon;
    if (direction === 'desc') return descIcon ?? defaultDescIcon;
    return unsortedIcon ?? defaultUnsortedIcon;
  };

  // If no sort handler is provided, just render as plain text
  if (!onSortChange) {
    return <span>{children}</span>;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isActive ? 'text-foreground' : 'text-muted-foreground'
      } ${className}`}
      aria-sort={
        direction === 'asc'
          ? 'ascending'
          : direction === 'desc'
            ? 'descending'
            : 'none'
      }
    >
      <span>{children}</span>
      {getIcon()}
    </button>
  );
}

export default SortableColumnHeader;
