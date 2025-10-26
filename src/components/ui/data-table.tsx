"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState, useMemo, useCallback, useEffect } from "react";
import { DataTablePagination } from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	page: number;
	limit: number;
	total_pages: number;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	page,
	limit,
	total_pages,
}: DataTableProps<TData, TValue>) {
	// State
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: page,
		pageSize: limit,
	});

	// Utils
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const pagination = useMemo(
		() => ({
			pageIndex: pageIndex - 1,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		onPaginationChange: setPagination,
		pageCount: total_pages,
		state: {
			pagination,
		},
	});

	const createQueryString = useCallback(
		(params: Record<string, string | number | string[] | null | undefined>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null || !value) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams]
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// useEffect(() => {
	// 	router.push(
	// 		`${pathname}?${createQueryString({
	// 			page: pageIndex,
	// 			limit: pageSize,
	// 		})}`
	// 	);
	// }, [pagination]);

	// useEffect(() => {
	// 	setPagination({
	// 		pageIndex: page,
	// 		pageSize: limit,
	// 	});
	// }, [page, limit]);

	return (
		<>
			<div className="overflow-hidden ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div>
				<DataTablePagination table={table} />
			</div>
		</>
	);
}
