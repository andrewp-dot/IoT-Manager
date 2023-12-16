import React, { useState, useCallback, useEffect } from 'react';
import Room from './Room';
import AddRoom from './AddRoom';
import cls from './styles/rooms.module.css';
import config from '../../../config.json';

const Rooms = ({ sysid }) => {
	const [rooms, setRooms] = useState([]);

	const getRoomsRequest = useCallback(async () => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({ sysid: sysid, request: 'getSystemRooms' }),
			});

			if (response.ok) {
				const rooms = await response.json();
				setRooms(rooms);
				console.log(rooms);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	}, [sysid]);

	const createRoomRequest = async (roomName) => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					sysid: sysid,
					roomName: roomName,
					request: 'createRoom',
				}),
			});
			// get response and set data
			if (response.ok) {
				const rooms = await response.json();
				setRooms(rooms);
				console.log(rooms);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getRoomsRequest();
	}, [getRoomsRequest]);

	const systemRooms = rooms.map((room) => (
		<Room key={room.id} name={room.name} devices={room.devices} />
	));

	return (
		<div className={cls['rooms']}>
			{systemRooms}
			<AddRoom createRoom={createRoomRequest} />
		</div>
	);
};

export default Rooms;
