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
import { DataTablePagination } from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useTransition,
} from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	total_pages: number;
}

export type Pagination = { pageIndex: number; pageSize: number };

export function DataTable<TData, TValue>({
	columns,
	data,
	total_pages,
}: DataTableProps<TData, TValue>) {
	// Utils
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	// State
	const [paginationState, setPaginationState] = useState<Pagination>({
		pageIndex: Number(searchParams.get("page") ?? 0),
		pageSize: Number(searchParams.get("per_page") ?? 10),
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

	const pagination = useMemo(
		() => ({
			pageIndex: paginationState.pageIndex,
			pageSize: paginationState.pageSize,
		}),
		[paginationState.pageIndex, paginationState.pageSize]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		onPaginationChange: setPaginationState,
		pageCount: total_pages,
		state: {
			pagination: pagination,
		},
	});

	useEffect(() => {
		console.log("Change pagination", paginationState);
	}, [paginationState]);

	useEffect(() => {
		router.push(
			`${pathname}?${createQueryString({
				page: paginationState.pageIndex,
				per_page: paginationState.pageSize,
			})}`
		);
	}, [paginationState.pageIndex, paginationState.pageSize]);

	//   useEffect(() => {
	//     setPagination({
	//       pageIndex: page,
	//       pageSize: limit,
	//     });
	//   }, [page, limit]);

	// console.log("pagination", paginationState);
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
