interface ContactsQueryParameters {
	/** Pagination */
	page?: number;
	per_page?: number;

	/** Search text (in first name, last name, or email) */
	q?: string;

	/** Source of the user */
	source?: "CRM" | "Organic";

	/** Category of the user */
	category?: "education" | "art" | "legal" | "unknown" | "financial";

	/** Status of the user */
	status?: "potential" | "customer" | "lapsed";

	/** Market/region name */
	market?: string;

	/** Date range filtering (ISO 8601 date strings) */
	created_at_before?: string; // e.g., '2023-10-20T10:00:00Z'
	created_at_after?: string; // e.g., '2023-01-01T00:00:00Z'

	/** Field to sort by */
	sort_by?: "total_order_amount" | "created_at";

	/** Sort direction (default: 'desc') */
	sort_order?: "asc" | "desc";
}
