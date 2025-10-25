import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Status } from "./types";

export const columns: ColumnDef<ContactResponse>[] = [
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
];

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
