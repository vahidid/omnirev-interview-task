import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
	const c = await cookies();

	if (c.has(ACCESS_TOKEN_KEY)) {
		return redirect("/panel/dashboard");
	}

	return redirect("/login");
}
