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

export default function DashboardFilter() {
	const marketsQuery = useGetMarket();

	const markets = useMemo<MultiSelectOption[]>(
		() =>
			marketsQuery.data?.data?.map(
				(market) => ({ label: market, value: market } as MultiSelectOption)
			) || [],
		[marketsQuery.data]
	);

	return (
		<div className=" flex items-center gap-2">
			<ToggleGroup type="single" variant="outline" spacing={2}>
				<ToggleGroupItem
					value="bold"
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
		</div>
	);
}
