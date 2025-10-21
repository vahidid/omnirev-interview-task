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

export default function HighValueCustomer() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>High-Value Customers</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Sales</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow className="">
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell className="">$250.00</TableCell>
						</TableRow>
						<TableRow className="">
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell className="">$250.00</TableCell>
						</TableRow>
						<TableRow className="">
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell className="">$250.00</TableCell>
						</TableRow>
						<TableRow className="">
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell className="">$250.00</TableCell>
						</TableRow>
						<TableRow className="">
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell className="">$250.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
