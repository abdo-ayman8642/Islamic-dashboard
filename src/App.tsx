import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard';
import { AlertProvider } from './contexts/alertContext';
import Login from 'Pages/Auth/Login';

const App: React.FC = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<Routes>
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
