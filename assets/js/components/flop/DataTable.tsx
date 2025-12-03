/**
 * NbFlop DataTable Component
 *
 * A TanStack Table wrapper that integrates with Flop for server-side
 * pagination, sorting, and filtering. Uses shadcn/ui table primitives.
 *
 * @example Basic usage
 * ```tsx
 * import { DataTable } from '@/components/flop';
 * import { columns } from './columns';
 *
 * function UsersIndex({ users, meta }: UsersIndexProps) {
 *   return (
 *     <DataTable
 *       columns={columns}
 *       data={users}
 *       meta={meta}
 *     />
 *   );
 * }
 * ```
 *
 * @example With Flop integration
 * ```tsx
 * import { DataTable, useFlopParams, flopToQueryParams } from '@/components/flop';
 * import { router } from '@/lib/inertia';
 * import { users_path } from '@/routes';
 *
 * function UsersIndex({ users, meta }: UsersIndexProps) {
 *   const flop = useFlopParams(meta, {
 *     onParamsChange: (params) => {
 *       router.visit(users_path({ query: flopToQueryParams(params) }), {
 *         preserveState: true,
 *         preserveScroll: true,
 *       });
 *     },
 *   });
 *
 *   return (
 *     <DataTable
 *       columns={columns}
 *       data={users}
 *       meta={meta}
 *       onSortChange={flop.setSort}
 *       getSortDirection={flop.getSortDirection}
 *     />
 *   );
 * }
 * ```
 */

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
  type Table as TanStackTable,
} from '@tanstack/react-table';
import type { FlopMeta, SortDirection } from './types';

// Re-export ColumnDef for convenience
export type { ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  /** Column definitions */
  columns: ColumnDef<TData, TValue>[];
  /** Data to display */
  data: TData[];
  /** Flop meta for pagination info */
  meta?: FlopMeta | null;
  /** Callback when sort changes - integrate with flop.setSort */
  onSortChange?: (field: string, direction: SortDirection) => void;
  /** Get current sort direction for a field - integrate with flop.getSortDirection */
  getSortDirection?: (field: string) => SortDirection;
  /** Custom empty state */
  emptyState?: React.ReactNode;
  /** Table container className */
  className?: string;
  /** Row className - can be a string or function for conditional styling */
  rowClassName?: string | ((row: Row<TData>) => string);
  /** Callback when row is clicked */
  onRowClick?: (row: Row<TData>) => void;
  /** Render function for table footer */
  footer?: (table: TanStackTable<TData>) => React.ReactNode;
}

/**
 * Context for passing sort state to column headers
 */
export interface DataTableContextValue {
  onSortChange?: (field: string, direction: SortDirection) => void;
  getSortDirection?: (field: string) => SortDirection;
}

export const DataTableContext = React.createContext<DataTableContextValue>({});

/**
 * Hook to access DataTable context in column definitions
 */
export function useDataTableContext() {
  return React.useContext(DataTableContext);
}

/**
 * DataTable component using TanStack Table with Flop integration
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  onSortChange,
  getSortDirection,
  emptyState,
  className,
  rowClassName,
  onRowClick,
  footer,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // We don't use TanStack's sorting/pagination - Flop handles it server-side
    manualPagination: true,
    manualSorting: true,
    pageCount: meta?.totalPages ?? -1,
  });

  const contextValue = React.useMemo(
    () => ({ onSortChange, getSortDirection }),
    [onSortChange, getSortDirection]
  );

  const getRowClassName = (row: Row<TData>) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row);
    }
    return rowClassName ?? '';
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className={className}>
        {/*
          This component expects shadcn/ui table components to be available.
          Users should have these installed via: npx shadcn@latest add table
        */}
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-10 px-2 text-left align-middle font-medium text-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${getRowClassName(row)} ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyState ?? 'No results.'}
                </td>
              </tr>
            )}
          </tbody>
          {footer && (
            <tfoot className="bg-muted/50 border-t font-medium [&>tr]:last:border-b-0">
              {footer(table)}
            </tfoot>
          )}
        </table>
      </div>
    </DataTableContext.Provider>
  );
}

export default DataTable;
