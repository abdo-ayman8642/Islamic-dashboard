'use client';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Information {
	_id: string;
	lang: string;
	value: string;
}

interface Category {
	_id: string;
	albums: string[];
	description: Information[];
	title: Information[];
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
}

interface CategoryCardProp {
	category: Category;
	onClick: (data: Category) => void;
	onDelete: (data: Category) => void;
}

const CategoryCard = ({ category, onClick, onDelete }: CategoryCardProp) => {
	return (
		<div className="trending__item text-center round16 play-button-container">
			<div className="thumb ralt overhid transition">
				<img
					src={category.thumbnail || 'https://islamic-app.s3.us-east-2.amazonaws.com/category/2024-02-03_category.jpg'}
					width={200}
					height={200}
					className="transition"
					style={{ height: '200px', width: '200px' }}
					alt="img"
				/>
				<div className="podcast__viwer d-flex align-items-center ">
					<span className="viewer fs-16 bodyfont white">
						{'num_albums'} {category.albums?.length}
					</span>
				</div>

				<div className="trending__bbar d-flex align-items-center justify-content-around">
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onClick(category)}
						style={{ cursor: 'pointer' }}>
						<EditIcon />
					</div>
					<div
						className="d-flex fs-16 fw-500 white align-items-center gap-3"
						onClick={() => onDelete(category)}
						style={{ cursor: 'pointer' }}>
						<DeleteIcon />
					</div>
				</div>
			</div>
			<div className="content mt-16">
				<h5>
					<div className=" d-block mb-1" style={{ fontSize: '25px', color: 'black' }}>
						{category.title![0].value}
					</div>
				</h5>
			</div>
		</div>
	);
};

export default CategoryCard;
