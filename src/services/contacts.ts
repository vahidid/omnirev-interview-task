import apiClient from "@/lib/apiClient";

export const RegisterNewUserService = (req: ContactsQueryParameters) =>
	apiClient.post<ServiceResponse<ContactResponse[]>>(
		"/v1/client/authorization/user/register",
		req
	);
