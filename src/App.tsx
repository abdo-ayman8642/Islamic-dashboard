import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard';
import { AlertProvider } from './contexts/alertContext';
import Login from 'Pages/Auth/Login';
import { Toaster } from 'react-hot-toast';
import Forget from 'Pages/Auth/Forget';
import Reset from 'Pages/Auth/Reset';

const App: React.FC = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<Toaster position="bottom-right" />
				<Routes>
					<Route path="/forgot-password" element={<Forget />} />
					<Route path="/reset-password/:token" element={<Reset />} />
					<Route path="/login" element={<Login />} />
					{/* <Route path="/forgot-password" element={<ForgetPassword />} />
					<Route path="/reset-password/:token" element={<ResetPassword />} />
					<Route path="/activate-account/:token" element={<ActivateAccount />} />
					<Route path="/set-password/:id" element={<SetNewPassword />} /> */}
					<Route path="/*" element={<Dashboard />} />
				</Routes>
			</AlertProvider>
		</QueryClientProvider>
	);
};

export default App;
