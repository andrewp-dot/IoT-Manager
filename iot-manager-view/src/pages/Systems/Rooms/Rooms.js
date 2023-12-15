import React from 'react';
import Room from './Room';
import cls from './styles/rooms.module.css';

const Rooms = () => {
	return (
		<div className={cls['rooms']}>
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
		</div>
	);
};

export default Rooms;
