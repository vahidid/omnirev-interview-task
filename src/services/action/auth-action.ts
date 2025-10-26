"use server";

import { cookies } from "next/headers";
import { LoginService } from "../auth";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { AxiosError } from "axios";
import { AppError } from "@/lib/errors";
import { redirect } from "next/navigation";

export async function LoginAction(req: LoginReq) {
	try {
		const response = await LoginService(req);

		const c = await cookies();

		// Set Tokens in cookies
		c.set(ACCESS_TOKEN_KEY, response.data.token, {
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new AppError(
				error.response?.data?.error || "کد تایید اشتباه است.",
				error.response?.data?.error
			);
		}
		throw error;
	}
}

export async function LogoutAction() {
	const c = await cookies();
	const accessToken = c.get(ACCESS_TOKEN_KEY);

	if (accessToken) {
		c.delete(ACCESS_TOKEN_KEY);
	}

	redirect("/login");
}
