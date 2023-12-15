import React, { useRef, useState } from 'react';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';

const AddSystemCard = ({ createSystem }) => {
	const [addSystem, setAddSystem] = useState(false);
	const sysnameInputRef = useRef(null);

	const handleChangeSysname = (e) => {
		if (e.key === 'Enter') {
			if (sysnameInputRef.current.value.trim() !== '') {
				createSystem(sysnameInputRef.current.value.trim());
			}
			setAddSystem(false);
		}
	};
	let content;
	if (addSystem) {
		content = (
			<input
				ref={sysnameInputRef}
				type='text'
				onKeyDown={handleChangeSysname}
			/>
		);
	} else {
		content = '+';
	}
	return (
		<Card>
			<div
				className={cls['system']}
				onClick={() => {
					setAddSystem(true);
				}}
			>
				{content}
			</div>
		</Card>
	);
};

export default AddSystemCard;
