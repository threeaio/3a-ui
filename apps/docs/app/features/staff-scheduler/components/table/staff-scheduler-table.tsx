'use client'

import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  ExpandedState,
  createColumnHelper,
} from '@tanstack/react-table'
import { cn } from '@3a.solutions/ui/lib/utils'
import { StaffMember, Project, getTimePeriods } from '../../mock-data'
import { TimeUnit } from '../time-unit-toggle'
import { WorkloadCell } from './workload-cell'
import { EmployeeRow } from './employee-row'
import { ProjectRow } from './project-row'
import { TimePeriodHeader } from './time-period-header'

interface StaffSchedulerTableProps {
  data: StaffMember[]
  timeUnit: TimeUnit
  className?: string
}

/**
 * Type for table data structure
 */
type TableRow = StaffMember | (Project & { parentId: string })

/**
 * Custom column meta type to include className
 */
interface ColumnMeta {
  className?: string
}

/**
 * Main component for the staff scheduler table
 */
export const StaffSchedulerTable: React.FC<StaffSchedulerTableProps> = ({ data, timeUnit, className = '' }) => {
  // State for expanded rows
  const [expanded, setExpanded] = useState<ExpandedState>({})

  // Get time periods based on selected time unit
  const timePeriods = useMemo(() => getTimePeriods(timeUnit), [timeUnit])

  // Prepare data for the table
  const tableData = useMemo(() => {
    const rows: TableRow[] = []

    // Add staff members as parent rows
    data.forEach((staff) => {
      rows.push(staff)
    })

    return rows
  }, [data])

  // Column helper for type-safe column definitions
  const columnHelper = createColumnHelper<TableRow>()

  // Define columns
  const columns = useMemo(() => {
    const cols: ColumnDef<TableRow, any>[] = [
      // Employee column (sticky)
      columnHelper.display({
        id: 'employee',
        header: () => (
          <div className="px-10 flex flex-col text-left font-normal text-muted-foreground justify-center">Employee</div>
        ),
        cell: ({ row }) => {
          const isStaffMember = 'projects' in row.original

          if (isStaffMember) {
            const staff = row.original as StaffMember
            return (
              <EmployeeRow
                employee={staff}
                isExpanded={row.getIsExpanded()}
                onToggleExpand={() => row.toggleExpanded()}
              />
            )
          } else {
            const project = row.original as Project & { parentId: string }
            return <ProjectRow project={project} />
          }
        },
        meta: {
          className: 'sticky left-0 z-10 bg-background border-r border-border min-w-60 w-80',
        } as ColumnMeta,
      }),
    ]

    // Add time period columns
    timePeriods.forEach((period, index) => {
      const relativeIndex = index - Math.floor(timePeriods.length / 2)

      cols.push(
        columnHelper.accessor(
          (row) => {
            if ('projects' in row) {
              // Staff member
              return (row as StaffMember).workload[period] ?? null
            } else {
              // Project
              return (row as Project & { parentId: string }).workload[period] ?? null
            }
          },
          {
            id: `period-${period}`,
            header: () => <TimePeriodHeader period={period} relativeIndex={relativeIndex} />,
            cell: ({ getValue, row, column }) => {
              const value = getValue()

              // Get the current column index in the visible columns
              const columnIndex = row.getVisibleCells().findIndex((cell) => cell.column.id === column.id)
              const cells = row.getVisibleCells()

              // Check if previous and next cells are empty (null)
              const prevCell = columnIndex > 0 ? cells[columnIndex - 1] : null
              const nextCell = columnIndex < cells.length - 1 ? cells[columnIndex + 1] : null

              // Get values from adjacent cells
              const prevCellValue = prevCell ? prevCell.getValue() : null
              const nextCellValue = nextCell ? nextCell.getValue() : null

              // Determine if adjacent cells are empty
              const prevCellEmpty = prevCellValue === null
              const nextCellEmpty = nextCellValue === null

              return (
                <WorkloadCell
                  value={value as number | null}
                  prevCellEmpty={prevCellEmpty}
                  nextCellEmpty={nextCellEmpty}
                />
              )
            },
            meta: {
              className: 'min-w-20',
            } as ColumnMeta,
          },
        ) as ColumnDef<TableRow, any>,
      )
    })

    return cols
  }, [columnHelper, timePeriods])

  // Set up the table
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => {
      if ('projects' in row) {
        // Return projects as sub-rows for staff members
        return (row as StaffMember).projects.map((project) => ({
          ...project,
          parentId: (row as StaffMember).id,
        }))
      }
      return []
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    // rounded-xl border
    <div className={cn('', className)}>
      <table className="w-full border-collapse">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'min-h-20', // border-b border-border
                    (header.column.columnDef.meta as ColumnMeta | undefined)?.className,
                  )}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex, rows) => {
            // Check if this is the last row of an employee group
            const isLastRowOfGroup = (() => {
              // If this is the last row overall, it's the last of its group
              if (rowIndex === rows.length - 1) return true

              // If the next row has depth 0 (is an employee), this is the last of current group
              const nextRow = rows[rowIndex + 1]
              return nextRow?.depth === 0
            })()

            return (
              <React.Fragment key={row.id}>
                <tr className={cn('last:border-0', row.depth > 0 && 'bg-background')}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cn((cell.column.columnDef.meta as ColumnMeta | undefined)?.className)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>

                {/* Add a spacer row after the last row of each group */}
                {isLastRowOfGroup && (
                  <tr className="h-5">
                    <td className="border-r"></td>
                    <td colSpan={row.getVisibleCells().length - 1}></td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
