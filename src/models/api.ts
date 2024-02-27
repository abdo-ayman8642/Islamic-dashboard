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

interface Information {
	_id: string;
	lang: string;
	value: string;
}

export interface Category {
	_id: string;
	albums: string[];
	description: Information[];
	title: Information[];
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	slug: string;
}

export interface Album {
	_id: string;
	audios: Audio[];
	description: Information[];
	title: Information[];
	category: string[];
	thumbnail: string;
	rating: number;
	slug: string;
	userRates?: [
		{
			userId: string;
			rate: number;
			_id: string;
		}
	];
	isFavorite: boolean;
}

export interface Audio {
	_id: string;
	title: Information[];
	description: Information[];
	isFree: boolean;
	albums: Album[];
	rating: number;
	createdAt: string;
	slug: string;
	thumbnail: string;
}
