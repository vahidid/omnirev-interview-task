import CompaniesChart from "@/app/features/charts/companies-chart";

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex-1">
				<h1>Dashboard</h1>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<CompaniesChart />
			</div>
		</div>
	);
}
