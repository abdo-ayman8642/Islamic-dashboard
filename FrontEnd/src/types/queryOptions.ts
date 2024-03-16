export type TQueryOptions = {
	id?: number;
	key?: string;
	domain?: string;
	menuID?: string;
	modelID?: string;
	slug?: string;
	searchTerm?: string;
	category?: string;
	categories?: string[];
	limit?: number;
	clientId?: number;
	workshopId?: number;
	fromDate?: string;
	toDate?: string;
	price?: {
		gt?: number;
		lt?: number;
		gte?: number;
		lte?: number;
	};
	discount?: {
		gt?: number;
		lt?: number;
		gte?: number;
		lte?: number;
	};
};
