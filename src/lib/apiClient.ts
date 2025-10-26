import { ACCESS_TOKEN_KEY, API_URL } from "@/utils/constants";
import { isServer } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
	baseURL: API_URL,
	// withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
	/* Mock Server don't support the Authorization header and it get CORS error */

	// if (isServer) {
	// 	const cookies = (await import("next/headers")).cookies;

	// 	const c = await cookies();
	// 	const token = c.get(ACCESS_TOKEN_KEY);
	// 	if (token && config?.headers) {
	// 		config.headers.Authorization = `${token}`;
	// 	}
	// 	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	// } else if (window != undefined) {
	// 	const cookieValue = document.cookie
	// 		.split("; ")
	// 		.find((row) => row.startsWith(`${ACCESS_TOKEN_KEY}=`))
	// 		?.split("=")[1];
	// 	if (cookieValue && config?.headers) {
	// 		config.headers.Authorization = `${cookieValue}`;
	// 	}
	// }

	return config;
});

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalConfig = error.config;
		// TODO: implement refresh token
		return Promise.reject(error);
	}
);

export default apiClient;
