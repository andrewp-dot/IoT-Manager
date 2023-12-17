import React, { useRef, useState, useEffect } from 'react';
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
	useEffect(() => {
		// Focus on the input when it becomes visible
		if (addSystem) {
			sysnameInputRef.current.focus();
		}
	}, [addSystem]);

	return (
		<Card backgroundColor={'rgba(255,255,255,0.7'}>
			<div
				className={cls['system']}
				onClick={() => {
					setAddSystem(true);
				}}
			>
				{addSystem ? (
					<div className={cls['add-system']}>
						<h3>New System Name</h3>
						<input
							ref={sysnameInputRef}
							type={'text'}
							onKeyDown={handleChangeSysname}
							onBlur={() => setAddSystem(false)}
						/>
					</div>
				) : (
					<div className={cls['add-system-preview']}>+</div>
				)}
			</div>
		</Card>
	);
};

export default AddSystemCard;
