export enum FieldType {
	Input,
	Select,
	Date,
	DateRange,
	Number,
	Search,
	ToggleGroup,
}

export interface FieldOption {
	value: string;
	label: string;
}
export interface Field {
	title: string;
	key: string;
	type: FieldType;
	options?: FieldOption[];
}

export default interface FilterProps {
	fields: Field[];
}

export type DateRangeKeys = {
	created_at_after?: Date;
	created_at_before?: Date;
};
