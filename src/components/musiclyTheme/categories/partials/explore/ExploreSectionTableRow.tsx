'use client';
import { Audio } from 'models/api';

import { useState } from 'react';

import { useQueryClient } from 'react-query';

import { Link } from 'react-router-dom';
import { truncateWord } from 'helpers/utils';

type Props = {
	audio: Audio;
};
const ExploreSectionTableRow = ({ audio }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const queryClient = useQueryClient();

	return (
		<>
			<tr className="citem__border" style={{ position: 'relative' }}>
				<td data-bs-toggle="modal" data-bs-target={`#exampleModalaudio`}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '10px',
							alignItems: 'center'
						}}>
						<Link
							to={`../audios/${audio.slug}`}
							className="upgrade__left d-flex align-items-center"
							style={{ cursor: 'pointer' }}>
							<img
								src={audio.thumbnail || '/img/pocast/q.png'}
								alt="img"
								width={100}
								height={100}
								style={{ aspectRatio: '1/1' }}
							/>
							<span className="fs-16 fw-500 bodyfont white d-block">
								{audio.title[0].value}
								<span className="fs-12 mt-1 laufey fw-400 pra bodyfont d-block">
									{truncateWord(audio.description[0].value, 50)}
								</span>
							</span>
						</Link>
					</div>
				</td>
			</tr>
			{/* <AudioPlayerModal
        id={`${index}`}
        audioLink="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
      /> */}
		</>
	);
};

export default ExploreSectionTableRow;
