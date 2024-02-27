'use client';

import { Album } from './AlbumSection';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

interface AlbumCard {
	album: Album;
	onClick: (data: Album) => void;
	onDelete: (data: Album) => void;
	onImage: (data: Album) => void;
}

const AlbumCard = ({ album, onClick, onDelete, onImage }: AlbumCard) => {
	return (
		<div className="trending__item text-center round16 play-button-container">
			<div className="thumb ralt overhid transition">
				<img
					src={album.thumbnail || '/img/pocast/q.png'}
					width={200}
					height={200}
					className="w-100  transition overhid  h-100 transition"
					style={{ width: '200px', aspectRatio: '1/1' }}
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
						onClick={() => onImage(album)}
						style={{ cursor: 'pointer' }}>
						<ImageIcon />
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
					<div className=" d-block mb-1" style={{ fontSize: '18px', color: 'black' }}>
						{album.title![0].value}
					</div>
				</h5>
			</div>
		</div>
	);
};

export default AlbumCard;
