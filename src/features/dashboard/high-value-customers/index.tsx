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
import { useMemo } from "react";

export default function HighValueCustomer() {
	const contactsQuery = useGetContacts({
		per_page: 10,
		page: 1,
		sort_by: "total_order_amount",
		sort_order: "desc",
	});
	const contacts = useMemo(
		() => contactsQuery.data?.data.data || [],
		[contactsQuery.data]
	);
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
