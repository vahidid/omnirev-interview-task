import { UpdateContactService } from "@/services/contacts";
import { useMutation } from "@tanstack/react-query";

export const useUpdateContact = () =>
	useMutation({
		mutationFn: (req: ContactUpdateReq) => UpdateContactService(req),
	});
