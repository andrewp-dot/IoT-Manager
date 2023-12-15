import React from 'react';
import Card from '../../../UI/Card';
import cls from './styles/rooms.module.css';

const Room = () => {
	return (
		<Card>
			<div className={cls['room']}>
				<h2>Room name</h2>
				<ul>
					<li>Device1</li>
					<li>Device2</li>
					<li>Device3</li>
				</ul>
			</div>
		</Card>
	);
};

export default Room;
