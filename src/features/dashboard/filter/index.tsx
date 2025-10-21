import RangeCalendar from "@/components/range-calendar";
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Select,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function DashboardFilter() {
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
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
					<SelectItem value="system">System</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
