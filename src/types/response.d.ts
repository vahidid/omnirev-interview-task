interface ContactResponse {
	/** Unique identifier for the user */
	id: string;

	/** User's first name */
	first_name: string;

	/** User's last name */
	last_name: string;

	/** User's email address (must be a valid email format) */
	email: string;

	/** User's phone number (string to handle formatting like hyphens or country codes) */
	phone_number: string;

	/** User's market/region */
	market: string;

	/** User's current status (from the defined set) */
	status: "potential" | "customer" | "lapsed";

	/** Date and time the user was created (ISO 8601 format) */
	created_at: string;

	/** Source of the user (CRM or Organic) */
	source: "CRM" | "Organic";

	/** Total number of orders placed by the user */
	order_count: number;

	/** User's category/industry */
	category: "education" | "art" | "legal" | "unknown" | "financial";

	/** Total monetary amount of all orders placed by the user */
	total_order_amount: number;
}
