"use client";
import CategoriesChart from "@/features/dashboard/categories-chart";
import HighValueCustomer from "@/features/dashboard/high-value-customers";
import DashboardFilter from "@/features/dashboard/filter";

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1 flex justify-between">
				<h1 className=" text-3xl font-bold">Dashboard</h1>
				<DashboardFilter />
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<CategoriesChart />
				<HighValueCustomer />
			</div>
		</div>
	);
}
