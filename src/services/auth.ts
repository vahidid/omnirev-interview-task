import apiClient from "@/lib/apiClient";

export const LoginService = (req: LoginReq) =>
	apiClient.post<LoginRes>("/auth/login", req);
