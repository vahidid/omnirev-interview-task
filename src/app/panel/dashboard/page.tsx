import CompaniesChart from "@/app/features/dashboard/companies-chart";
import HighValueCustomer from "@/app/features/dashboard/high-value-customers";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1 flex">
				<h1 className="flex-1 text-3xl font-bold">Dashboard</h1>
				<div className="flex-2">
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
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<CompaniesChart />
				<HighValueCustomer />
			</div>
		</div>
	);
}
