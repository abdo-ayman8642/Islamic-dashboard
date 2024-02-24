export type Feature = {
	id: number;
	name: string;
	icon: string;
	slug: string;
	singleName: string;
	precedence: string;
	parentID: string;
	children: any[];
};

export interface IResponse {
	Code: number;
	Message: string;
	ErrorId: null;
	Result: any;
}
export interface IChart {
	Labels: string[];
	label?: string;
	Values: number[] | string[];
	Children?: IChartChildren[];
	Ids?: number[];
}
export interface IChartChildren {
	LabelFilter: string;
	Data: IChartChildrenData;
}

export interface IChartChildrenData {
	Labels: string[];
	Values: number[] | string[];
}

export interface DateRangeProps {
	startDate: Date;
	endDate: Date;
	key?: string;
}
