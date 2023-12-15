import React from 'react';
import cls from './styles/cardStyles.module.css';

const Card = ({ width, backgroundColor, children }) => {
	let bgColor = backgroundColor || 'var(--color-primary)';
	return (
		<div
			style={{ width: width, backgroundColor: bgColor }}
			className={cls['card']}
		>
			{children}
		</div>
	);
};

export default Card;
