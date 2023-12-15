import React from 'react';
import cls from './styles/checkbox.module.css';

const Checkbox = () => {
	return (
		<label htmlFor='checkbox' className={cls['toogle']}>
			<input
				className={cls['input']}
				id='checkbox'
				type='checkbox'
				onChange={() => {
					console.log('Value changed!');
				}}
			/>
			<span className={cls['slider']} />
		</label>
	);
};

export default Checkbox;
