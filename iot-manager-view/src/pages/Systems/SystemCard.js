import React from 'react';
import cls from './styles/systems.module.css';

const SystemCard = ({ system }) => {
	return (
		<div
			className={cls['system']}
			// redirect to other site with systems detail etc
			onClick={() => console.log(system.sysname)}
		>
			{system.sysname}
		</div>
	);
};

export default SystemCard;
