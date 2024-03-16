import { Alert } from '@mui/material';
import Albums from 'Pages/Albums/Albums';
import Analytics from 'Pages/Analytics/Analytics';
import Categories from 'Pages/Categories/Categories';
import Podcasts from 'Pages/Podcasts/Podcasts';
import Profile from 'Pages/Profile/Profile';
import Users from 'Pages/Users/Profile';
import ActionLoader from 'components/UI/ActionLoader';
import AlbumDetails from 'components/musiclyTheme/albums/partials/AlbumDetails';
import CategoryDetails from 'components/musiclyTheme/categories/partials/CategoryDetails';
import { Resources } from 'enums/rosources';
import { fetchServices } from 'framework/services';
import { Feature } from 'models/api';

import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router-dom';

interface Props {}

const Listing: React.FC<Props> = () => {
	let { slug } = useParams<{ slug: string }>();
	const { data, isError, isLoading } = useQuery<Feature[]>('features', fetchServices);
	if (isLoading) return <ActionLoader position="fixed" />;
	if (isError) return <Alert severity="error">Something went wrong, please try again later.</Alert>;
	let feature: Feature | undefined = data?.find(
		(feature) => feature.slug === slug || feature.children.some((child) => child.slug === slug)
	);
	if (feature?.children?.length! > 0) feature = feature?.children.find((child) => child.slug === slug);
	if (!feature) return <Alert severity="error">404 - Page not found</Alert>;

	// const renderCreateForm = () => {
	//   if (!feature) return null;
	//   if (feature.slug.toLowerCase() === Resources.CATEGORIES)
	//     return <NewCategory feature={feature} />;

	//  };

	const renderEditForm = () => {
		if (!feature) return null;

		if (feature.name === Resources.CATEGORIES) return <CategoryDetails />;
		if (feature.name === Resources.ALBUMS) return <AlbumDetails />;
	};

	const renderList = () => {
		if (!feature) return null;

		if (feature.name === Resources.ANALYTICS) return <Analytics />;
		if (feature.name === Resources.ALBUMS) return <Albums />;
		if (feature.name === Resources.CATEGORIES) return <Categories />;
		if (feature.name === Resources.PODCASTS) return <Podcasts />;
		if (feature.name === Resources.PROFILE) return <Profile />;
		if (feature.name === Resources.USERS) return <Users />;
	};

	return (
		<>
			<Routes>
				<Route path="/*" element={renderList()} />
				{/* <Route path="new" element={renderCreateForm()} /> */}
				<Route path={`:${feature.singleName}slug/*`} element={renderEditForm()} />
			</Routes>
		</>
	);
};

export default Listing;
