import React from 'react';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';
import { Link } from 'react-router-dom';

const SystemCard = ({ system }) => {
	const systemUrl = '/systems/' + system.id;

	return (
		<>
			<Card>
				<Link to={systemUrl}>
					<div className={cls['system']}>{system.sysname}</div>
				</Link>
			</Card>
		</>
	);
};

export default SystemCard;
