import queryKeys from "@/lib/queryKeys";
import { GetContactsService } from "@/services/contacts";
import { GetMarketService } from "@/services/market";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = (params?: ContactsQueryParameters) =>
	useQuery({
		queryKey: [queryKeys.GetContacts, ...[params ? params : []]],
		queryFn: () => GetContactsService(params),
	});

export const useGetMarket = () =>
	useQuery({
		queryKey: [queryKeys.GetMarkets],
		queryFn: () => GetMarketService(),
	});
