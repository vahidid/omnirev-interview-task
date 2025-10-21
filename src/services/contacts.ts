import apiClient from "@/lib/apiClient";

export const GetContactsService = (req?: ContactsQueryParameters) =>
	apiClient.get<ServiceResponse<ContactResponse[]>>("/contacts", {
		params: req,
	});
