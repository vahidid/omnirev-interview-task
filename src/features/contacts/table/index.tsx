"use client";

import { DataTable } from "@/components/ui/data-table";
import { ContactsTableProps } from "./types";
import { columns } from "./column";
function ContactsTable(props: ContactsTableProps) {
	const { data } = props;

	return <DataTable columns={columns} data={data} />;
}

export default ContactsTable;
