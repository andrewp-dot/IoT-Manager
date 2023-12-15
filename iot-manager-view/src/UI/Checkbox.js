import React, { useState } from 'react';
import cls from './styles/checkbox.module.css';

const Checkbox = ({ id, value, onValueChange }) => {
	const [checked, setChecked] = useState(value);
	return (
		<label htmlFor={id} className={cls['toogle']}>
			<input
				className={cls['input']}
				id={id}
				type='checkbox'
				onChange={() => {
					setChecked(!checked);
					onValueChange();
				}}
				checked={checked}
			/>
			<span className={cls['slider']} />
		</label>
	);
};

export default Checkbox;
