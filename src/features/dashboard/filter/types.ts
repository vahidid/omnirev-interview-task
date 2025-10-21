export interface DashboardFilterProps {
	filters: ContactsQueryParameters; // use the original request as our model for filtering
	onChangeFilter: (params: ContactsQueryParameters) => void;
}
