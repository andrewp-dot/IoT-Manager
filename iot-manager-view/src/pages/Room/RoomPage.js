import React, { useEffect, useState, useCallback } from 'react';
import ProtectedPage from '../ProtectedPage';
import { useParams } from 'react-router-dom';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import config from '../../config.json';
import cls from './styles/roomPage.module.css';

const RoomPage = () => {
	const { id: sysid, roomID } = useParams();
	const [room, setRoom] = useState([]);

	const getRoom = useCallback(async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					roomid: roomID,
					request: 'getRoom',
				}),
			});

			if (response.ok) {
				const room = await response.json();
				setRoom(room);
				console.log(room);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	}, [sysid, roomID]);

	useEffect(() => {
		getRoom();
	}, [getRoom]);

	return (
		<ProtectedPage>
			<div className={cls['room-page']}>
				<Card>
					<div className={cls['room-content']}>
						<h2>{room.name}</h2>
						<div className={cls['room-devices']}>
							{/* {room.devices.map((device) => (
								<p key={device.id}>{device.alias}</p>
							))} */}
						</div>
						<div>
							<Button onClick={() => console.log('Add device')}>Add</Button>
						</div>
					</div>
				</Card>
			</div>
		</ProtectedPage>
	);
};

export default RoomPage;
