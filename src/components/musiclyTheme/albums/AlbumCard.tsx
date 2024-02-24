'use client';

import { Album } from './AlbumSection';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface AlbumCard {
	album: Album;
	onClick: (data: Album) => void;
	onDelete: (data: Album) => void;
}

const AlbumCard = ({ album, onClick, onDelete }: AlbumCard) => {
	return (
		<div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6">
			<div className="trending__item text-center round16 play-button-container">
				<div className="thumb ralt overhid transition">
					<img
						src={album.thumbnail || '/img/albumb/def_album.jpg'}
						width={200}
						height={200}
						className="transition"
						style={{ height: '200px', width: '200px' }}
						alt="img"
					/>

					<div className="trending__bbar d-flex align-items-center justify-content-around">
						<div
							className="d-flex fs-16 fw-500 white align-items-center gap-3"
							onClick={() => onClick(album)}
							style={{ cursor: 'pointer' }}>
							<EditIcon />
						</div>
						<div
							className="d-flex fs-16 fw-500 white align-items-center gap-3"
							onClick={() => onDelete(album)}
							style={{ cursor: 'pointer' }}>
							<DeleteIcon />
						</div>
					</div>
				</div>
				<div className="content mt-16">
					<h5>
						<div className=" d-block mb-1" style={{ fontSize: '25px', color: 'black' }}>
							{album.title![0].value}
						</div>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default AlbumCard;
