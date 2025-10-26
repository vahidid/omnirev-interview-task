import { ColumnDef } from "@tanstack/react-table";

export interface ContactsTableProps {
	data: ContactResponse[];
	total_pages: number;
}

export enum Status {
	Customer = "customer",
	Potential = "potential",
	Lapsed = "lapsed",
}