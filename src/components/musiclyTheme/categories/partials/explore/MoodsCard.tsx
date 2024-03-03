'use client';
import { Close } from '@mui/icons-material';
import { Album } from 'models/api';

interface AudioCard {
	album: Album;
	onRemove: (data: Album) => void;
}
const MoodsCard2 = ({ album, onRemove }: AudioCard) => {
	return (
		<div className="trending__item text-center round16 play-button-container">
			<div className="thumb ralt overhid transition">
				<img
					src={album.thumbnail || '/img/pocast/q.png'}
					width={150}
					height={150}
					className="w-80  transition overhid  h-80 transition"
					style={{ width: '150px', aspectRatio: '1/1' }}
					alt="img"
				/>

				<div className="trending__bbar d-flex align-items-center justify-content-around">
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						style={{ cursor: 'pointer' }}
						onClick={() => onRemove(album)}>
						<Close />
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

export default MoodsCard2;
