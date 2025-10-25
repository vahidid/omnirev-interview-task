import { ColumnDef } from "@tanstack/react-table";

export interface ContactsTableProps {
	data: ContactResponse[];
}

export enum Status {
	Customer = "customer",
	Potential = "potential",
	Lapsed = "lapsed",
}