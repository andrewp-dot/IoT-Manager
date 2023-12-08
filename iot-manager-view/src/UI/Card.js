import React from 'react';
import cls from './styles/cardStyles.module.css';

const Card = ({ width, children }) => {
	return (
		<div style={{ width: width }} className={cls['card']}>
			{children}
		</div>
	);
};

export default Card;
