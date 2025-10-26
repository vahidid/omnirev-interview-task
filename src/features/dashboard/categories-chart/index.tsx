"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useGetCategoriesStats } from "@/hooks/query";
import { removePercentageMark } from "@/utils/strings";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pie, LabelList, PieChart, Legend, Cell, Label } from "recharts";

const COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export default function CategoriesChart() {
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

	const categoriesQuery = useGetCategoriesStats(filter);

	const categoriesRes = useMemo(
		() =>
			Object.entries(categoriesQuery.data?.data || {}).map((item, index) => ({
				category: item[0],
				percentage: removePercentageMark(item[1]),
				fill: COLORS[index % COLORS.length],
			})),
		[categoriesQuery.data]
	);

	useEffect(() => {
		setFilterFromSearchParams();
	}, [setFilterFromSearchParams]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Categories</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{} satisfies ChartConfig}
					className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[350px]"
				>
					<PieChart>
						<Pie data={categoriesRes} dataKey="percentage">
							<Label value="test" position="outside" />
							<LabelList
								dataKey="percentage"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: string) => {
									return `${value}%`;
								}}
							/>
						</Pie>
						<Legend
							content={({ payload }) => (
								<ul className="flex flex-col gap-2">
									{payload?.map((entry, index) => (
										<li
											key={`item-${index}`}
											className="flex items-center gap-2 text-sm"
										>
											<span
												className="inline-block h-3 w-3 rounded-sm"
												style={{ backgroundColor: entry.color }}
											></span>
											{/* @ts-expect-error handle chart payload type */}
											{entry.payload?.category || ""}
										</li>
									))}
								</ul>
							)}
							layout="vertical"
							verticalAlign="middle"
							align="right"
							formatter={(v) => {
								return categoriesRes[v].category;
							}}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
