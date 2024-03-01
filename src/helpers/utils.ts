import { Order, SortOrder } from 'constants/enums';
import * as XLSX from 'xlsx';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export const getUserStatusBadgeStyle = (
	status: number
): {
	color: string;
	backgroundColor: string;
} => {
	switch (status) {
		case 1:
			return {
				color: 'primary.main',
				backgroundColor: '#3A974C'
			};
		case 2:
			return {
				color: '#F29339',
				backgroundColor: '#F29339'
			};

		default:
			return {
				color: 'primary.main',
				backgroundColor: '#3A974C'
			};
	}
};

export function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === SortOrder.DESC
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function isValidDomain(domain: string) {
	var regex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i;
	return regex.test(domain);
}
export function exportXLSX(params: any) {
	const { data, headCells, filename } = params;
	const heads: any = [];
	const rows: any = [];

	let exportData = data;
	// console.log({ exportData });

	['Label', 'Value'].forEach((headCell: string) => {
		heads.push(headCell);
		// heads.push(t('header.' + headCell.label));
	});

	rows.push(heads);

	exportData.forEach((row: any, index: number) => {
		rows.push([headCells[index], row]);
	});

	try {
		const wb = XLSX.utils.book_new();
		const newWs = XLSX.utils.aoa_to_sheet(rows);
		XLSX.utils.book_append_sheet(wb, newWs);
		const rawExcel = XLSX.write(wb, { type: 'base64' });

		const encodedUri = encodeURI(rawExcel);
		const link = document.createElement('a');
		link.setAttribute(
			'href',
			'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodedUri
		);
		link.setAttribute('download', `${filename}.xlsx`);
		document.body.appendChild(link); // Required for FF

		link.click();
	} catch (err) {
		console.log(err);
	}
}

export const handleErrors = (error: any) => {
	if (error.response) {
		// Request made and server responded
		return error.response.data;
	} else if (error.request) {
		// The request was made but no response was received
		return error.request;
	} else {
		// Something happened in setting up the request that triggered an Error
		return error.message;
	}
};
/**
 * Convert string hours to it's equivalent in numbers
 *
 * @param hours hours: string
 * @param format format: string
 *
 * @returns number
 */
export const hoursStringToNumber = (hours: string, format: string): number => {
	const time = hours.split(':')[0];

	return format === 'PM'
		? parseInt(time) + 12 === 24
			? 12
			: parseInt(time) + 12
		: parseInt(time) === 12
		? 0
		: parseInt(time);
};

/**
 * Compare giver hour in number to current locale hour
 *
 * @param hour hour: number
 *
 * @returns number
 */
export const compareHoursToCurrent = (hour: number): number => {
	const d = new Date();
	let currentHour = d.getHours();

	return hour - currentHour;
};

/**
 * Capitalize first letter of a given string
 *
 * @param string string: string
 *
 * @returns string
 */
export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stableSort(array: readonly any[], comparator: any) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export function randomStr(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export const formatAMPM = (isoDate: string) => {
	const date = new Date(isoDate);
	let hours: string | number = date.getHours();
	let minutes: string | number = date.getMinutes();
	const ampm = hours >= 12 ? 'pm ' : 'am';

	hours %= 12;
	hours = hours || 12;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	const strTime = `${hours}:${minutes} ${ampm}`;

	return strTime;
};

export function getDayNumber(dateStr: string, locale: string) {
	const date = new Date(dateStr);
	return date.getDate();
}

export function getDateFormatted(date: Date) {
	const today = date ? new Date(date) : new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();

	return yyyy + '- ' + mm + '- ' + dd;
}

export function capitalizeWords(string: string) {
	return string.replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
}

export const mergeListOfStringsByDash = (list: string[] | null) => {
	if (list !== null && list.length) return list.reduce((prev, current) => `${prev} - ${current}`);

	return '';
};

export const mergeListOfStrings = (list: (string | null)[], delimiter: string) => {
	if (list !== null && list.length) return list.reduce((prev, current) => `${prev} ${delimiter} ${current}`);

	return '';
};

export const makeFakePhoneNumbers = (index: number, length: number) => {
	var result = `01${index}`;
	var characters = '0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const getDomainName = () => {
	if (window.location.hostname === 'localhost') return 'itzone';
	return 'itzone';
};

export const createArray = (size: number) => Array.from({ length: size }, (_, i) => i);

export function convertToCamelCase(text: string) {
	return text.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase();
	});
}

export function extractSelectedCheckboxes(keyName: string, data: any) {
	const selected: string[] = [];

	for (let key of Object.getOwnPropertyNames(data)) {
		if (key.includes(keyName)) {
			if (data[key] === true) {
				selected.push(key.replace(keyName, ''));
			}
		}
	}

	return selected;
}

export function validatePhone(phone: string) {
	var re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
	return re.test(phone);
}

export function convertToSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}

export function camelCaseToSpaces(text: string): string {
	const result: string = text.replace(/([A-Z])/g, '$1');
	return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
  The pxToRem() function helps you to convert a px unit into a rem unit,
 */
export function pxToRem(number: number, baseNumber: number = 16): string {
	return `${number / baseNumber}rem`;
}

export function shuffleArray(array: any[]) {
	let currentIndex = array.length;

	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

/**
  The hexToRgb() function helps you to change the hex color code to rgb
  using chroma-js library.
 */

/**
  The linearGradient() function helps you to create a linear gradient color background
 */

export function linearGradient(color: string, colorState: string, angle: number = 195): string {
	return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export function excerpt(str: string, maxLength: number): string {
	if (str.length > maxLength) return str.substring(0, maxLength) + '...';

	return str;
}
/**
  The rgba() function helps you to create a rgba color code, it uses the hexToRgb() function
  to convert the hex code into rgb for using it inside the rgba color format.
 */

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

/**
  The boxShadow() function helps you to create a box shadow for an element
 */

export function getDayTime(): string {
	const today: Date = new Date();
	const curHr: number = today.getHours();

	if (curHr < 12) {
		return 'morning';
	} else if (curHr < 18) {
		return 'afternoon';
	} else {
		return 'evening';
	}
}

export const removeUndefined = (obj: any) => {
	Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
	return obj;
};
/**
 * Reformats a number into a currency string
 *
 * @param number number: number
 *
 * @returns string
 */
export default function getCurrencyFormat(number: number): string {
	const formatter = Intl.NumberFormat('en', { maximumSignificantDigits: 3, style: 'currency', currency: 'USD' });
	return formatter.format(number);
}

export function getErrorTranslation(code: string): string {
	const errorTranslations: { [key: string]: string } = {
		'#1.1.1': 'Something wrong',
		'#1.1.2': 'This email is already exist',
		'#1.1.3': 'Password is required',
		'#1.1.4': 'This email not found',
		'#1.1.5': 'Invalid password',
		'#1.1.6': 'Name is required',
		'#1.1.7': 'User not found',
		'#1.1.8': 'This email is not verified',
		'#1.1.9': 'This item not found',
		'#1.1.10': 'Invalid data',
		'#1.1.11': 'This album is not found',
		'#1.1.12': 'This category is not found',
		'#1.1.13': 'Title is required',
		'#1.1.14': 'Description is required',
		'#1.1.15': 'Audio is not found',
		'#1.1.16': 'This Title is already exist',
		'#1.1.17': 'Wrong data',
		'#1.1.18': 'No Audio streaming found',
		'#1.1.19': 'Error while uploading audio',
		'#1.1.20': 'This audio is already in favorite list',
		'#1.1.21': 'This audio is not in favorite list',
		'#1.1.22': 'You must subscribe to access this audio',
		'#1.1.23': 'You must add a unique slug',
		'#1.1.24': 'Only support image files',
		'#1.1.25': 'Only support audio files'
	};

	if (errorTranslations.hasOwnProperty(code)) {
		return errorTranslations[code];
	} else {
		return errorTranslations['#1.1.1'];
	}
}

export function truncateWord(word: string, maxLength: number) {
	if (word.length > maxLength) {
		return word.substring(0, maxLength) + '...';
	}
	return word;
}

export function formatDate(timestamp: string) {
	const date = new Date(timestamp);

	return date.toLocaleString('en-US');
}
