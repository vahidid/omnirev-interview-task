"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetContacts } from "@/hooks/query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function HighValueCustomer() {
	// State
	const [filter, setFilter] = useState<ContactsQueryParameters>({});

	// Utils
	const searchParams = useSearchParams();

	const setFilterFromSearchParams = useCallback(() => {
		const filterParams: ContactsQueryParameters = {};

		if (searchParams.has("created_at_after"))
			filterParams.created_at_after =
				searchParams.get("created_at_after") ?? undefined;
		if (searchParams.has("created_at_before"))
			filterParams.created_at_before =
				searchParams.get("created_at_before") ?? undefined;
		if (searchParams.has("market"))
			filterParams.market = searchParams.get("market") ?? undefined;

		setFilter(filterParams);
	}, [searchParams]);

	const contactsQuery = useGetContacts({
		per_page: 10,
		page: 1,
		sort_by: "total_order_amount",
		sort_order: "desc",
		...filter,
	});
	const contacts = useMemo(
		() => contactsQuery.data?.data.data || [],
		[contactsQuery.data]
	);

	// Effects
	useEffect(() => {
		setFilterFromSearchParams();
	}, [setFilterFromSearchParams]);

	return (
		<Card className="pb-0">
			<CardHeader>
				<CardTitle>High-Value Customers</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<Table className="m-0 p-0">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Sales</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{contacts.map((contact) => (
							<TableRow key={contact.id} className="">
								<TableCell className="font-medium">
									{contact.first_name} {contact.last_name}
								</TableCell>
								<TableCell className="">
									<span className="font-bold">
										${contact.total_order_amount.toFixed(2)}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
