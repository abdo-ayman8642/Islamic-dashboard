export enum Languages {
	ENGLISH = 'en',
	ARABIC = 'ar'
}

export enum Resources {
	PERFORMANCE = 'performance',
	CLIENT_MATRIX = 'client-matrix',
	USER_MANAGEMENT = 'user-management',
	CONSOLIDATION = 'consolidation',
	MANAGE_TOPICS = 'manage-topics',
	WORKSHOP_COUNT_BY_YEAR = 'workshop-counts-by-year',
	MAN_DAYS = 'man-days'
}

export enum Models {
	CATEGORY = 'Category',
	ORDER = 'Order',
	PRODUCT = 'Product',
	MEDIA_LIBRARY = 'media',
	CHAT = 'Chat',
	RATING = 'Rating',
	VENDOR = 'Vendor',
	CUSTOM_CONTENT = 'CustomContent',
	CUSTOM_THUMBNAIL = 'CustomThumbnail',
	USER = 'User'
}

export enum AuthErrors {
	USER_EXISTS = 'UsernameExistsException'
}

export enum AdminGroups {
	ADMIN = 'admin'
}

export enum AdminApiPaths {
	LIST_USERS = '/listUsers',
	LIST_USERS_IN_GROUP = '/listUsersInGroup',
	LIST_GROUPS_FOR_USER = '/listGroupsForUser',
	GET_USER = '/getUser',
	LIST_GROUPS = '/listGroups',
	ADD_USER_TO_GROUP = '/addUserToGroup',
	REMOVE_USER_FROM_GROUP = '/removeUserFromGroup',
	DISABLE_USER = '/disableUser',
	ENABLE_USER = '/enableUser'
}

export enum StatuesIds {
	CANCELLED = '151a9e09-5d09-4f07-9928-90cccf46f41d',
	CLOSED = '1ca36387-69d5-4dba-be42-634b34493729'
}

export enum InputTypes {
	TEXT = 'text',
	EMAIL = 'email',
	PASSWORD = 'password',
	NUMBER = 'number',
	DATE = 'date',
	TIME = 'time',
	DATE_TIME_LOCAL = 'datetime-local',
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
	TEXTAREA = 'textarea',
	FILE = 'file',
	IMAGE = 'image',
	COLOR = 'color',
	RANGE = 'range',
	TEL = 'tel',
	URL = 'url',
	SEARCH = 'search',
	MONTH = 'month',
	WEEK = 'week',
	HIDDEN = 'hidden',
	SELECT = 'select',
	SELECT_WITH_INPUT = 'select with input',
	MULTI_SELECT = 'multi select',
	EDITOR = 'editor',
	CHECKBOXES = 'checkboxes',
	CALENDER = 'calender',
	SWITCH = 'switch'
}

export enum Navigate {
	NEXT = 'next',
	PREV = 'prev'
}
export enum Responses {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info'
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc'
}
export type Order = 'asc' | 'desc';

export enum SortBy {
	CREATED_AT = 'createdAt',
	UPDATED_AT = 'updatedAt',
	NAME = 'name',
	EMAIL = 'email',
	PHONE = 'phone',
	STATUS = 'status',
	START_DATE = 'startDate',
	END_DATE = 'endDate'
}

export enum Cookies {
	SESSION = 'session',
	ACCOUNT = 'account'
}

export enum AuthMessages {
	LOGIN_SUCCESS = 'Login successfully',
	LOGOUT_SUCCESS = 'Logout successfully',
	REGISTER_SUCCESS = 'Register successfully',
	FORGET_PASSWORD_SUCCESS = 'Forget password successfully',
	RESET_PASSWORD_SUCCESS = 'Reset password successfully'
}

export enum FormActions {
	CREATE = 'Create',
	UPDATE = 'Update'
}

export enum MODAL_TYPES {
	RESOURCE = 'resource',
	MEDIA = 'media'
}

export enum Statuses {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
	BUSY = 'busy'
}

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export enum PaymentTypes {
	DOMAIN = 'domain',
	SUBSCRIPTION = 'subscription'
}

export enum QuestionTypes {
	TEXT = 'text',
	TEXTAREA = 'textarea',
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
	SELECT = 'select',
	MULTI_SELECT = 'multi select',
	TRUE_FALSE = 'true_false',
	CHOICE = 'choice',
	FILE = 'file'
}

export enum Messages {
	SUCCESS = 'Success'
}
export enum CHARTS {
	BAR = 'bar',
	BAR2 = 'bar2',
	LINE = 'line',
	PIE = 'pie',
	DOUGHNUT = 'doughnut',
	POLAR_AREA = 'polarArea',
	RADAR = 'radar',
	BUBBLE = 'bubble',
	MULTI_BAR_CHART = 'multiBarChart',
	MULTI_BAR_CHART2 = 'multiBarChart2',
	MULTI_BAR_CHART3 = 'multiBarChart3',
	GUAGE = 'guage',
	AREA = 'area'
}
