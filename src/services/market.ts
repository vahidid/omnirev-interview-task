import apiClient from "@/lib/apiClient";

export const GetMarketService = () => apiClient.get<string[]>("/markets");
export const GetCategoriesStatService = (params?: ContactsQueryParameters) =>
	apiClient.get<Record<string, string>>("/categories/stats", { params });
