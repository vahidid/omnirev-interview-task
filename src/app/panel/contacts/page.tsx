"use client";
import Filter from "@/components/filter";
import { FieldType } from "@/components/filter/types";
import ContactsTable, { statusOptions } from "@/features/contacts/table";
import { Status } from "@/features/contacts/table/types";
import { useGetContacts, useGetMarket } from "@/hooks/query";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ContactsPage() {
	// Utils
	const searchParams = useSearchParams();

	const filterParams = useMemo<ContactsQueryParameters>(
		() => ({
			status: (searchParams.get("status") as Status) ?? undefined,
			market: searchParams.get("market") ?? undefined,
			q: searchParams.get("q") ?? undefined,
			page: Number(searchParams.get("page") ?? 1),
			per_page: Number(searchParams.get("per_page") ?? 50),
		}),
		[searchParams]
	);

	// Query
	const contactsQuery = useGetContacts(filterParams);
	const marketsQuery = useGetMarket();

	const marketOptions = useMemo(
		() => marketsQuery.data?.data.map((m) => ({ label: m, value: m })),
		[marketsQuery.data]
	);

	const contacts = useMemo(
		() => contactsQuery.data?.data.data || [],
		[contactsQuery.data]
	);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1 space-y-2">
				<h1 className="text-3xl font-bold">
					Contacts{" "}
					<span className="text-xl text-muted-foreground">
						({contactsQuery.data?.data.pagination.total})
					</span>
				</h1>
				<Filter
					fields={[
						{
							key: "q",
							title: "Search",
							type: FieldType.Search,
						},
						{
							key: "status",
							title: "Status",
							type: FieldType.Select,
							options: statusOptions,
						},
						{
							key: "market",
							title: "Select a Market",
							type: FieldType.Select,
							options: marketOptions,
						},
					]}
				/>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<ContactsTable
					data={contacts}
					total_pages={contactsQuery.data?.data.pagination.total_pages || 0}
				/>
			</div>
		</div>
	);
}
