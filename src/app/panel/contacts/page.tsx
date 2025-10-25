"use client";
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	Form,
} from "@/components/ui/form";
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
	InputGroupButton,
} from "@/components/ui/input-group";
import { MultiSelect } from "@/components/ui/multi-select";
import ContactsTable from "@/features/contacts/table";
import { useGetContacts } from "@/hooks/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum Status {
	Customer = "customer",
}

const statusOptions = [{ value: Status.Customer, label: "Customer" }];

export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

const formSchema = z.object({
	search: z.string().optional(),
	status: z.enum([Status.Customer]).optional(),
});

export default function ContactsPage() {
	// Query
	const contactsQuery = useGetContacts();

	const contacts = useMemo(
		() => contactsQuery.data?.data.data || [],
		[contactsQuery.data]
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1 space-y-2">
				<h1 className="text-3xl font-bold">
					Contacts{" "}
					<span className="text-xl text-muted-foreground">
						({contactsQuery.data?.data.pagination.total})
					</span>
				</h1>
				<div className="flex justify-between">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex gap-5 items-center"
						>
							<FormField
								control={form.control}
								name="search"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<InputGroup>
												<InputGroupInput {...field} placeholder="Search..." />
												<InputGroupAddon align="inline-end">
													<InputGroupButton>
														<SearchIcon />
													</InputGroupButton>
												</InputGroupAddon>
											</InputGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<MultiSelect
												options={statusOptions}
												value={field.value}
												onValueChange={field.onChange}
												placeholder="Status"
												hideSelectAll
												deduplicateOptions
												searchable={false}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<ContactsTable data={contacts} />
			</div>
		</div>
	);
}
