import { useLocation } from 'react-router-dom';
import { useAlert } from '../../contexts/alertContext';

import { Stack } from '@mui/material';
import useLoading from 'hooks/loading';
import useApp from 'hooks/useApp';
import useAuthStore from 'store/auth';

const Analytics: React.FC = () => {
	const { alert } = useAlert();
	const setSession = useAuthStore((state) => state.setSession);
	const { pathname, search } = useLocation();
	const { push } = useApp();
	const { loading, setLoading } = useLoading();

	// if (loading) return <ActionLoader position="fixed" />;
	return (
		<>
			<Stack component="main" direction={'row'} useFlexGap>
				Analytics
			</Stack>
		</>
	);
};

export default Analytics;
