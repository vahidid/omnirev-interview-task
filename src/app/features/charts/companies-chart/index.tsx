"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, LabelList, PieChart, Legend } from "recharts";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

export default function CompaniesChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Companies</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[350px]"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="visitors" hideLabel />}
						/>
						<Pie data={chartData} dataKey="visitors">
							<LabelList
								dataKey="browser"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartConfig) =>
									chartConfig[value]?.label
								}
							/>
						</Pie>
						<Legend layout="vertical" verticalAlign="middle" align="right" />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
