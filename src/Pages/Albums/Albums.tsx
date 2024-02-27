import { useLocation } from 'react-router-dom';
import { useAlert } from '../../contexts/alertContext';

import useLoading from 'hooks/loading';
import useApp from 'hooks/useApp';
import useAuthStore from 'store/auth';
import AlbumSection from 'components/musiclyTheme/albums/AlbumSection';

const Albums: React.FC = () => {
	const { alert } = useAlert();
	const setSession = useAuthStore((state) => state.setSession);
	const { pathname, search } = useLocation();
	const { push } = useApp();
	const { loading, setLoading } = useLoading();

	// if (loading) return <ActionLoader position="fixed" />;
	return <AlbumSection />;
};

export default Albums;
