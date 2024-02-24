import { memo, Suspense, useCallback } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAlert } from '../../contexts/alertContext';

import MuiSnackbar from 'components/UI/MuiSnackbar';

import Listing from 'Pages/Listing';
import { Stack } from '@mui/material';
import ActionLoader from 'components/UI/ActionLoader';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import { LocalStorage } from 'enums/localStorage';
import useLoading from 'hooks/loading';
import useApp from 'hooks/useApp';
import useAuthStore from 'store/auth';

const Dashboard: React.FC = () => {
	const { alert } = useAlert();
	const setSession = useAuthStore((state) => state.setSession);
	const { pathname, search } = useLocation();
	const { push } = useApp();
	const { loading, setLoading } = useLoading();

	const redirectToLogin = (): void => {
		setSession(null);
		setLoading(false);
		localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
		push('/login');
	};

	const initApp = useCallback(async () => {
		try {
			// await authGuard();

			setSession(JSON.parse(localStorage.getItem(LocalStorage.PROFILE)!));

			setLoading(false);

			push(search.length === 0 ? pathname : pathname + search);
		} catch (err: Error | any) {
			redirectToLogin();
		}

		// eslint-disable-next-line
	}, []);

	// useEffect(() => {
	// 	const accessToken: string | null = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
	// 	if (accessToken) initApp();
	// 	else redirectToLogin();

	// 	// eslint-disable-next-line
	// }, []);

	// if (loading) return <ActionLoader position="fixed" />;
	return (
		<>
			<Stack
				component="main"
				direction={'row'}
				bgcolor="background.default"
				width={'100dvw'}
				height={'100dvh'}
				useFlexGap>
				<Suspense fallback={<ActionLoader position="fixed" />}>
					<SideMenu />
					<Stack width={1} height={1} p={2} flexGrow={1} sx={{ overflowY: 'auto' }}>
						<Header />
						<Suspense fallback={<ActionLoader position="fixed" />}>
							<Routes>
								<Route path="/*" element={<Navigate to={'/analytics'} />} />
								<Route path=":slug/*" element={<Listing />} />
							</Routes>
						</Suspense>
					</Stack>
				</Suspense>
			</Stack>

			<MuiSnackbar alert={alert!} />
		</>
	);
};

export default memo(Dashboard);
