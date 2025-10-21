import apiClient from "@/lib/apiClient";

export const GetMarketService = () => apiClient.get<string[]>("/markets");
export const GetCategoriesStatService = () =>
	apiClient.get<Record<string, string>>("/categories/stats");
