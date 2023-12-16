import React from 'react';
import cls from './styles/cardStyles.module.css';

const Card = ({ width, height, backgroundColor, children }) => {
	let bgColor = backgroundColor || 'var(--color-primary)';
	return (
		<div
			style={{ width: width, height: height, backgroundColor: bgColor }}
			className={cls['card']}
		>
			{children}
		</div>
	);
};

export default Card;
