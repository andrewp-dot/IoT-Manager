import React, { useState } from 'react';
import cls from './styles/checkbox.module.css';

const Checkbox = ({ value, getValue }) => {
	const [checked, setChecked] = useState(value);
	return (
		<label htmlFor='checkbox' className={cls['toogle']}>
			<input
				className={cls['input']}
				id='checkbox'
				type='checkbox'
				onChange={() => {
					setChecked(!checked);
					getValue();
				}}
				checked={checked}
			/>
			<span className={cls['slider']} />
		</label>
	);
};

export default Checkbox;
