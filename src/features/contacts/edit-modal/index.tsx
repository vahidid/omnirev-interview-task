"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditContactModalProps } from "./types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/phone-input";
import { ClientHandleError } from "@/lib/errors";
import { useUpdateContact } from "@/hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/lib/queryKeys";
import { toast } from "sonner";
const formScheme = z.object({
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	email: z.email(),
	phone_number: z.string().optional(),
	source: z.enum(["CRM", "Organic"]).optional(),
});

export function EditContactModal(props: EditContactModalProps) {
	const { open, onClose, selected } = props;

	// Utils
	const queryClient = useQueryClient();

	// Mutation
	const updateContactMutation = useUpdateContact();

	// Form
	const form = useForm<z.infer<typeof formScheme>>({
		resolver: zodResolver(formScheme),
		defaultValues: {
			email: selected?.email,
			first_name: selected?.first_name,
			last_name: selected?.last_name,
			phone_number: `+1${selected?.phone_number}`,
			source: selected?.source,
		},
	});

	const onSubmit = async (value: z.infer<typeof formScheme>) => {
		try {
			if (selected) {
				await updateContactMutation.mutateAsync({
					contactId: selected.id,
					...value,
				});

				await queryClient.invalidateQueries({
					queryKey: [queryKeys.GetContacts],
				});
				toast.success("Contact updated successfully.");
				onClose();
			}
		} catch (error) {
			ClientHandleError(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Edit Contact</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="phone_number"
								render={({ field }) => (
									<FormItem className="flex flex-col items-start">
										<FormLabel className="text-left">Phone Number</FormLabel>
										<FormControl className="w-full">
											<PhoneInput
												placeholder="Enter a phone number"
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-left">
											Enter a phone number
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="source"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="gap-4 pt-5">
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button isLoading={updateContactMutation.isPending} type="submit">
								Update
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
