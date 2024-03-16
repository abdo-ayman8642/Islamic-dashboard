import { FC } from 'react';

import { IFormField, IOption } from 'models/app';
import { InputTypes } from 'constants/enums';
import RHTextField from './RHTextField';
import RHPasswordField from './RHPasswordField';
import RHAutoComplete from './RHAutoComplete';
import RHCalender from './RHCalender';
import RHSwitch from './RHSwitch';

interface Props extends IFormField {
	errors: any;
	control: any;
	watch: any;
	setValue: any;
	register: any;
	options?: IOption[];
	required?: boolean;
	defaultValue?: any;
}

const FormFields: FC<Props> = (props) => {
	const { type, hidden } = props;

	const renderField = (): React.ReactNode => {
		if (hidden) return null;
		if (type === InputTypes.TEXT || type === InputTypes.HIDDEN || type === InputTypes.NUMBER) {
			return <RHTextField {...props} />;
		}

		if (type === InputTypes.EMAIL) {
			return <RHTextField {...props} />;
		}
		if (type === InputTypes.PASSWORD) {
			return <RHPasswordField {...props} />;
		}



		if (type === InputTypes.MULTI_SELECT) {
			return <RHAutoComplete {...props} multiple={true} defaultValue={props.defaultValue || []} />;
		}
		if (type === InputTypes.SWITCH) {
			return <RHSwitch {...props} />;
		}

		if (type === InputTypes.SELECT) {
			return <RHAutoComplete {...props} />;
		}
		if (type === InputTypes.CALENDER) {
			return <RHCalender {...props} />;
		}
		return null;
	};

	return <>{renderField()}</>;
};

export default FormFields;
