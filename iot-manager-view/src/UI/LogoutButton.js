import React from 'react';
import cls from './styles/logoutButton.module.css';

const LogoutButton = ({ style, type, onClick, children }) => {
	return (
		<button
			style={style}
			className={cls['logout-button']}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default LogoutButton;
