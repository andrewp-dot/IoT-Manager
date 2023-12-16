import React, { useState } from 'react';
import cls from './styles/checkbox.module.css';

const Checkbox = ({ id, status, onStatusChange }) => {
	const [checked, setChecked] = useState(status);
	return (
		<label htmlFor={'toogle' + id} className={cls['toogle']}>
			<input
				className={cls['input']}
				id={'toogle' + id}
				type='checkbox'
				onChange={() => {
					setChecked(!checked);
					onStatusChange(checked, id);
				}}
				checked={checked}
			/>
			<span className={cls['slider']} />
		</label>
	);
};

export default Checkbox;
