import { CHARTS, Responses } from "constants/enums";
import { IChart } from "./api";

export interface IOption {
    label: string;
    value: string;
}


export interface HeadCell {
    disablePadding: boolean;
    id: keyof any;
    label: string;
    numeric: boolean;
}

export interface IFormField {
    name: string;
    label?: string;
    type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "multi select"
    | "image"
    | "checkboxes"
    | "editor"
    | "textarea"
    | "select with input"
    | "switch"
    | "file"
    | "color"
    | "custom field"
    | "multiple files"
    | "calender"
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    options?: IOption[];
    defaultValue?: any;
    multiple?: boolean;
    rows?: number;
    cols?: number;
    yearsOnly?: boolean;
    isEditor?: boolean;
    required?: boolean;
    hidden?: boolean;
    endAdornment?: any;
    startAdornment?: any;
    onChange?: (e: any) => void;
    grid?: number;
    disableSubmit?: boolean;
    helperText?: string;
    errorMessage?: string;
    isCustom?: boolean;
    customField?: any;
    notSavable?: boolean;
    onDeleteFile?: () => void;
    defaultImageUrl?: string;
    isViewValue?: boolean;
    uploadedFiles?: any[];
    maxSize?: number;
    bulkAction?: Boolean;
    bulkActionLabel?: string;
    bulkActionFn?: () => void;
    isHorizontal?: boolean;
    canSelectAll?: boolean;
}



export interface IResponse {
    type: Responses.SUCCESS | Responses.ERROR | Responses.WARNING | Responses.INFO;
    message?: string;
    data?: any;
}

export interface IChartView {
    isLocalLabel?: boolean;
    type: CHARTS;
    hidden?: boolean;
    data: IChart;
    isMultiple?: boolean;
    multipleData?: IChart[];
    label: string;
    backgroundColor?: string;
    borderColor?: string;
    backgroundColorPie?: string[];
    borderColorPie?: string[];
    borderWidth?: number;
    stack?: string;
    min?: number;
    max?: number;
    childrenBackgroundColor?: string;
    childrenBorderColor?: string;
    childrenBorderWidth?: number;
    childrenStack?: string;
    indexAxis?: "x" | "y";
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
    Id?: string;
    onExport?: () => void;
    seriesChildren?: any[];
    categoriesChildren?: any[];
    isPercentage?: boolean;
    onCustomDownload?: () => void;
}