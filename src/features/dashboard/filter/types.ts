import moment from "moment";

export const StaticDateFilterItems = [
	{
		title: "Yesterday",
		value: moment().subtract(1, "day").startOf("day").format("YYYY-MM-DD"),
	},
	{
		title: "7 Days",
		value: moment().subtract(7, "days").startOf("day").format("YYYY-MM-DD"),
	},
	{
		title: "30 Days",
		value: moment().subtract(30, "days").startOf("day").format("YYYY-MM-DD"),
	},
];
