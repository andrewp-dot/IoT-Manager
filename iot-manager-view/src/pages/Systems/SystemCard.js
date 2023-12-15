import React from 'react';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';

const SystemCard = ({ system }) => {
	return (
		<Card>
			<div
				className={cls['system']}
				// redirect to other site with systems detail etc
				onClick={() => console.log(system.sysname)}
			>
				{system.sysname}
			</div>
		</Card>
	);
};

export default SystemCard;
