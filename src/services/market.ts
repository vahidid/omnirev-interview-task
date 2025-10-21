import apiClient from "@/lib/apiClient";

export const GetMarketService = () => apiClient.get<string[]>("/markets");
