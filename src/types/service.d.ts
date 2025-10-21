interface Pagination {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
}

interface ServiceResponse<T> {
	data: T;
	pagination: Pagination;
}
