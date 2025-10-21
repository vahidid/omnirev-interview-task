import CompaniesChart from "@/app/features/dashboard/companies-chart";
import HighValueCustomer from "@/app/features/dashboard/high-value-customers";

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1">
				<h1>Dashboard</h1>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<CompaniesChart />
				<HighValueCustomer />
			</div>
		</div>
	);
}
