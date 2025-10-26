import { ColumnDef } from "@tanstack/react-table";

export interface ContactsTableProps {
	data: ContactResponse[];
	total_pages: number;
	page: number;
	limit: number;
}

export enum Status {
	Customer = "customer",
	Potential = "potential",
	Lapsed = "lapsed",
}