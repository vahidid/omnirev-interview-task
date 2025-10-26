import { LoginAction } from "@/services/action/auth-action";
import { LoginService } from "@/services/auth";
import { UpdateContactService } from "@/services/contacts";
import { useMutation } from "@tanstack/react-query";

export const useUpdateContact = () =>
	useMutation({
		mutationFn: (req: ContactUpdateReq) => UpdateContactService(req),
	});

export const useLoginMutation = () =>
	useMutation({
		mutationFn: LoginAction,
	});
