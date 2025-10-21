"use client";
import RangeCalendar from "@/components/range-calendar";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Select,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetMarket } from "@/hooks/query";
import { useMemo } from "react";
import { DashboardFilterProps } from "./types";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const formScheme = z.object({
	created_at_before: z.iso.date(),
	created_at_after: z.iso.date(),
});

export default function DashboardFilter(props: DashboardFilterProps) {
	const { filters, onChangeFilter } = props;

	const marketsQuery = useGetMarket();

	const markets = useMemo<MultiSelectOption[]>(
		() =>
			marketsQuery.data?.data?.map(
				(market) => ({ label: market, value: market } as MultiSelectOption)
			) || [],
		[marketsQuery.data]
	);

	// Form
	const form = useForm<z.infer<typeof formScheme>>({
		resolver: zodResolver(formScheme),
	});

	const onSubmit = (values: z.infer<typeof formScheme>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=" flex items-center gap-2"
			>
				<ToggleGroup
					type="single"
					variant="outline"
					spacing={2}
					onChange={(v) => console.log("v", v)}
					onValueChange={(v) => console.log("Value", v)}
				>
					<ToggleGroupItem
						value={new Date().toDateString()}
						className="data-[state=on]:border-primary"
					>
						Yesterday
					</ToggleGroupItem>
					<ToggleGroupItem
						value="italic"
						className="data-[state=on]:border-primary"
					>
						7 Days
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						className="data-[state=on]:border-primary"
					>
						30 Days
					</ToggleGroupItem>
				</ToggleGroup>
				<RangeCalendar />
				<Separator orientation="vertical" />
				<MultiSelect
					className="flex-1"
					options={markets}
					hideSelectAll
					deduplicateOptions
					searchable={false}
					onValueChange={() => console.log("Change value")}
				/>
			</form>
		</Form>
	);
}
