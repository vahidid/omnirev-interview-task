"use client";
import RangeCalendar from "@/components/range-calendar";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetMarket } from "@/hooks/query";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StaticDateFilterItems } from "./types";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function DashboardFilter() {
	// State
	const [filters, setFilter] = useState<ContactsQueryParameters>({}); // use the original request as our model for filtering

	// Utils
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Query
	const marketsQuery = useGetMarket();

	const markets = useMemo(
		() => marketsQuery.data?.data || [],
		[marketsQuery.data]
	);

	const dateRangeValue = useMemo(
		() => ({
			from: moment(filters.created_at_after || undefined).toDate(),
			to: moment(filters.created_at_before || undefined).toDate(),
		}),
		[filters]
	);

	const handleStaticDates = useCallback((afterDate: string) => {
		const nowDate = moment().format("YYYY-MM-DD");
		setFilter({
			created_at_before: nowDate,
			created_at_after: afterDate || "",
		});
	}, []);

	const handleRangeDates = useCallback((dateRange?: DateRange) => {
		if (dateRange) {
			const from = moment(dateRange.from).format("YYYY-MM-DD");
			const to = moment(dateRange.to).format("YYYY-MM-DD");
			setFilter({
				created_at_before: to,
				created_at_after: from,
			});
		}
	}, []);
	const handleSelectMarket = useCallback((market: string) => {
		setFilter((prev) => ({ ...prev, market }));
	}, []);

	const createQueryString = useCallback(
		(newParams: Record<string, string | null | any>) => {
			const params = new URLSearchParams(searchParams.toString());

			Object.entries(newParams).forEach(([key, value]) => {
				if (value === null || value === undefined) {
					params.delete(key); // remove param if value is null
				} else {
					params.set(key, value);
				}
			});

			return params.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		const newParams = createQueryString(filters);
		router.replace(`${pathname}?${newParams}`);
	}, [filters]);

	return (
		<div className=" flex items-center gap-2">
			<ToggleGroup
				type="single"
				variant="outline"
				spacing={2}
				onValueChange={handleStaticDates}
			>
				{StaticDateFilterItems.map((item) => (
					<ToggleGroupItem
						key={item.value}
						value={item.value}
						className="data-[state=on]:border-primary"
					>
						{item.title}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<RangeCalendar range={dateRangeValue} setRange={handleRangeDates} />
			<Separator orientation="vertical" />
			<Select onValueChange={handleSelectMarket}>
				<SelectTrigger className="min-w-[180px]">
					<SelectValue placeholder="Select a market" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Markets</SelectLabel>
						{markets.map((market) => (
							<SelectItem key={market} value={market}>
								{market}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

export default memo(DashboardFilter);