"use client";

import { DataTable } from "@/components/ui/data-table";
import { ContactsTableProps, Status } from "./types";
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useMemo, useState } from "react";
import { EditContactModal } from "../edit-modal";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const statusOptions = [
	{
		value: Status.Customer,
		label: "Customer",
	},
	{
		value: Status.Potential,
		label: "Potential",
	},
	{
		value: Status.Lapsed,
		label: "Lapsed",
	},
];

function ContactsTable(props: ContactsTableProps) {
	const { data, total_pages } = props;

	const [selectedContact, setSelectedContact] = useState<ContactResponse>();

	const columns = useMemo<ColumnDef<ContactResponse>[]>(
		() => [
			{
				header: "Name",
				cell: ({ row }) => (
					<span>
						{row.original.first_name} {row.original.last_name}
					</span>
				),
			},
			{
				header: "Status",
				cell: ({ row }) => (
					<Badge variant={row.original.status}>{row.original.status}</Badge>
				),
			},
			{
				header: "Source",
				cell: ({ row }) => <span>{row.original.source}</span>,
			},
			{
				header: "Order Count",
				cell: ({ row }) => <span>{row.original.order_count}</span>,
			},
			{
				header: "Total Order Value",
				cell: ({ row }) => (
					<span>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(row.original.total_order_amount)}
					</span>
				),
			},
			{
				header: "Created At",
				cell: ({ row }) => (
					<span>{moment(row.original.created_at).format("MMM D, h:mm a")}</span>
				),
			},
			{
				header: "Action",
				cell: ({ row }) => (
					<div>
						<Button
							variant="default"
							size="icon"
							onClick={() => setSelectedContact(row.original)}
						>
							<PencilLine />
						</Button>
					</div>
				),
			},
		],
		[]
	);

	return (
		<>
			<DataTable total_pages={total_pages} columns={columns} data={data} />
			{Boolean(selectedContact) && (
				<EditContactModal
					selected={selectedContact}
					open={Boolean(selectedContact)}
					onClose={() => setSelectedContact(undefined)}
				/>
			)}
		</>
	);
}

export default ContactsTable;
