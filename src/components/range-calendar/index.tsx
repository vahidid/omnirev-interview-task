"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendarProps } from "./types";

export default function RangeCalendar(props: RangeCalendarProps) {
	const { range, setRange } = props;

	return (
		<div className="flex flex-col gap-3">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="dates"
						className="w-56 justify-between font-normal"
					>
						{range?.from && range?.to
							? `${range.from.toLocaleDateString()} -> ${range.to.toLocaleDateString()}`
							: "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="range"
						selected={range}
						captionLayout="dropdown"
						onSelect={(range) => {
							setRange(range);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
