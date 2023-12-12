import React from 'react';
import cls from './styles/button.module.css';

const Button = ({ style, type, onClick, inverseStyle, children }) => {
	const styleTypeClass = inverseStyle ? cls['inverse'] : cls['classic'];
	return (
		<button
			style={style}
			className={`${cls['button']} ${styleTypeClass}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
