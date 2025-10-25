import { DateRange } from "react-day-picker";

export interface RangeCalendarProps {
	range: DateRange;
	setRange: (value?: DateRange) => void;
}
