'use client';
import { Audio } from 'models/api';
import MoodsCard2 from './MoodsCard';
import { Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import AddIcon from '@mui/icons-material/Add';

interface FavouriteAudios {
	audios: Audio[];
	onRemove: (data: Audio) => void;
	onAdd: () => void;
	onCreate: () => void;
}

const ExploreSection = ({ audios, onRemove, onAdd, onCreate }: FavouriteAudios) => {
	return (
		<section className="explore__section custom__space pb-60 pr-24 pl-24 pt-0">
			<div
				className="header__text mb-24 d-flex align-items-center justify-content-between flex-wrap gap-2"
				style={{ margin: '20px', marginTop: '100px' }}>
				<h2 style={{ color: 'black', textTransform: 'capitalize' }}>Podcasts</h2>
				<Stack
					component="main"
					direction={'row'}
					justifyContent={'center'}
					alignItems={'center'}
					useFlexGap
					sx={{ m: '20px', flexDirection: { xs: 'column', lg: 'row' } }}>
					<Grid container justifyContent={'flex-end'} sx={{ display: { lg: 'flex' }, gap: 3 }}>
						<MuiOutlineButton
							variant="outlined"
							color="inherit"
							size="small"
							sx={{ px: 4, py: 2 }}
							startIcon={<AddIcon sx={{ fill: '#232323' }} />}
							onClick={onAdd}>
							Add Existing Audio
						</MuiOutlineButton>
						<MuiOutlineButton
							variant="outlined"
							color="inherit"
							size="small"
							sx={{ px: 4, py: 2 }}
							startIcon={<AddIcon sx={{ fill: '#232323' }} />}
							onClick={onCreate}>
							Add New Audio
						</MuiOutlineButton>
					</Grid>
				</Stack>
			</div>
			{!!audios?.length ? (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
						<div className="row " style={{ flexWrap: 'wrap' }}>
							{audios.map((audio: Audio) => (
								<div key={audio._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
									<MoodsCard2 key={audio._id} audio={audio} onRemove={onRemove} />
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div style={{ textAlign: 'center', fontSize: 'larger' }}>{'No Audios'}</div>
			)}
		</section>
	);
};

export default ExploreSection;
