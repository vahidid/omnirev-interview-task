import queryKeys from "@/lib/queryKeys";
import { GetContactsService } from "@/services/contacts";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = (params?: ContactsQueryParameters) =>
	useQuery({
		queryKey: [queryKeys.GetContacts, ...[params ? params : []]],
		queryFn: () => GetContactsService(params),
	});
