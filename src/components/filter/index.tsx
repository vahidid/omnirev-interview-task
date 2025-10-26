"use client";

import {
	ChangeEvent,
	ChangeEventHandler,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useTransition,
} from "react";
import FilterProps, { DateRangeKeys, Field, FieldType } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import RangeCalendar from "../range-calendar";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Select,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

function Filter(props: FilterProps) {
	const { fields } = props;

	const [filterState, setFilterState] = useState<
		Record<string, string | number | string[] | Date | null | undefined> &
			DateRangeKeys
	>({});
	const searchTimeout = useRef<NodeJS.Timeout>(null);
	// Utils
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const isInternalNavRef = useRef(false);
	const lastQsRef = useRef<string>(searchParams?.toString() || "");

	const [, startTransition] = useTransition();

	const parseFromSearch = useCallback(() => {
		let newParams = {};
		searchParams.forEach((item, idx) => {
			// For Date field type need to convert to Date model
			if (
				fields.find(
					(field) => field.key === idx && field.type === FieldType.Date
				)
			) {
				newParams = {
					...newParams,
					[idx]: moment(String(item)).toDate(),
				};
				// When parse from search params and convert it to Date object
			} else if (idx === "created_at_after" || idx === "created_at_before") {
				newParams = { ...newParams, [idx]: moment(item).toDate() };
			}
			// Other fields are string
			else {
				newParams = { ...newParams, [idx]: item };
			}
		});

		// This is a filterStateLike
		return newParams;
	}, [searchParams]);

	const createQueryString = useCallback(
		(
			params: Record<
				string,
				string | number | string[] | Date | DateRangeKeys | null | undefined
			>
		) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null || !value) {
					newSearchParams.delete(key);
				} else {
					if (key === "page" || key === "per_page") {
						continue;
					}
					// Pass the stringified ISO 8106 format to search params
					if (key === "created_at_after" || key === "created_at_before") {
						newSearchParams.set(
							key,
							moment(String(value)).format("YYYY-MM-DD")
						);
					} else {
						newSearchParams.set(key, String(value));
					}
				}
			}
			

			return newSearchParams.toString();
		},
		[searchParams]
	);
	const handleSelect = useCallback((value: string, item: Field) => {
		if (item.key === "created_at_after") {
			// If toggle select is a Static Date (It can handle better :( )
			setFilterState((prev) => ({
				...prev,
				created_at_after: moment(String(value)).toDate(),
				created_at_before: new Date(),
			}));
			return;
		}
		if (item.key === "created_at_before") {
			setFilterState((prev) => ({
				...prev,
				created_at_after: new Date(),
				created_at_before: moment(String(value)).toDate(),
			}));
			return;
		}

		setFilterState((prev) => ({
			...prev,
			[item.key]: value,
		}));
	}, []);
	const handleChangeSearchInput = useCallback(
		(e: ChangeEvent<HTMLInputElement>, item: Field) => {
			// Implement debounce :)
			if (searchTimeout.current) clearTimeout(searchTimeout.current);

			searchTimeout.current = setTimeout(
				() =>
					setFilterState((prev) => ({
						...prev,
						[item.key]: e.target.value,
					})),
				500
			);
		},
		[searchTimeout]
	);

	// Effects
	useEffect(() => {
		const currentQs = searchParams?.toString() || "";
		const nextQs = createQueryString(filterState);
		if (nextQs !== currentQs) {
			isInternalNavRef.current = true;
			lastQsRef.current = nextQs;
			router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, {
				scroll: false,
			});
		}
	}, [JSON.stringify(filterState), pathname, router, searchParams]);

	useEffect(() => {
		const currentQs = searchParams?.toString() || "";

		if (isInternalNavRef.current) {
			isInternalNavRef.current = false;
			return;
		}

		if (currentQs !== lastQsRef.current) {
			const next = parseFromSearch();
			startTransition(() => setFilterState(next));
			lastQsRef.current = currentQs;
		}
	}, [searchParams, startTransition]);

	useEffect(() => {
		setFilterState(parseFromSearch());
	}, [parseFromSearch]);

	return (
		<div className="flex gap-4">
			{fields.map((item) => {
				if (item.type === FieldType.DateRange) {
					return (
						<RangeCalendar
							range={{
								from: filterState?.created_at_after,
								to: filterState?.created_at_before,
							}}
							setRange={(dvalue) => {
								if (dvalue)
									setFilterState((prev) => ({
										...prev,
										created_at_after: dvalue.from,
										created_at_before: dvalue.to,
									}));
							}}
						/>
					);
				}

				if (item.type === FieldType.Select) {
					return (
						<Select
							key={item.key}
							onValueChange={(v) => handleSelect(v, item)}
							value={filterState[item.key] as string}
						>
							<SelectTrigger className="min-w-[180px]">
								<SelectValue placeholder={item.title} />
							</SelectTrigger>
							<SelectContent>
								{item.options?.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					);
				}

				if (item.type === FieldType.Search) {
					return (
						<InputGroup key={item.key}>
							<InputGroupInput
								onChange={(e) => handleChangeSearchInput(e, item)}
								placeholder="Search..."
							/>
							<InputGroupAddon align="inline-end">
								<InputGroupAddon>
									<SearchIcon />
								</InputGroupAddon>
							</InputGroupAddon>
						</InputGroup>
					);
				}

				if (item.type === FieldType.ToggleGroup) {
					return (
						<ToggleGroup
							key={item.key}
							type="single"
							variant="outline"
							spacing={2}
							onValueChange={(value) => handleSelect(value, item)}
						>
							{item.options?.map((item) => (
								<ToggleGroupItem
									key={item.value}
									value={item.value}
									className="data-[state=on]:border-primary"
								>
									{item.label}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					);
				}
			})}
		</div>
	);
}

export default memo(Filter);
