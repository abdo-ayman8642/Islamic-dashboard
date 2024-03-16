export interface ILoginResponse {
	apiStatus: boolean;
	data: {
		token: string;
		user: any;
	};
}

export interface Result {
	ID: number;
	FirstName: string;
	Password: null;
	FatherName: string;
	FamilyName: string;
	Username: null;
	UserTypeID: number;
	JobFamilyID: number;
	JobPositionID: number;
	BusinessEmail: string;
	Phone: string;
	ClientID: number;
	JobPosition: null;
	JobFamily: null;
	DivisionID: number;
	Division: null;
	DepartmentID: number;
	Department: null;
	LocalAdmin: boolean;
	LocalUser: boolean;
	ClientAdmin: string;
	EmployeeID: string;
	IsArabic: boolean;
	PartnerID: string;
	UserGUID: null;
	Trainer: boolean;
	superAdmin: boolean;
	SubscriberId: number;
	SubscriberName: string;
	AccessToken: string;
	RefreshToken: string;
}
