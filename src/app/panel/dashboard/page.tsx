"use client";
import CategoriesChart from "@/features/dashboard/categories-chart";
import HighValueCustomer from "@/features/dashboard/high-value-customers";
import Filter from "@/components/filter";
import { FieldType } from "@/components/filter/types";
import { StaticDateFilterItems } from "@/features/dashboard/constants";
import { useGetMarket } from "@/hooks/query";
import { useMemo } from "react";

export default function Page() {
	// Query
	const marketsQuery = useGetMarket();

	const marketOptions = useMemo(
		() => marketsQuery.data?.data.map((m) => ({ label: m, value: m })),
		[marketsQuery.data]
	);
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1 flex justify-between">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<Filter
					fields={[
						{
							key: "created_at_after",
							title: "Static Dates",
							type: FieldType.ToggleGroup,
							options: StaticDateFilterItems,
						},
						{
							key: "date-range",
							title: "Select Date",
							type: FieldType.DateRange,
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
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<CategoriesChart />
				<HighValueCustomer />
			</div>
		</div>
	);
}
