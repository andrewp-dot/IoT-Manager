import React, { useEffect, useState, useCallback } from 'react';
import ProtectedPage from '../ProtectedPage';
import { useParams } from 'react-router-dom';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import config from '../../config.json';
import cls from './styles/roomPage.module.css';

const RoomPage = () => {
	const { id: sysid, roomID } = useParams();
	const [devices, setDevices] = useState([]);

	const getRoomDevices = useCallback(async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					roomid: roomID,
					request: 'getRoomDevices',
				}),
			});

			if (response.ok) {
				const devices = await response.json();
				setDevices(devices);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	}, [sysid, roomID]);

	useEffect(() => {
		getRoomDevices();
	}, [getRoomDevices]);

	return (
		<ProtectedPage>
			<div className={cls['room-page']}>
				<Card>
					<div className={cls['room-content']}>
						{/* name in here */}
						<h2>
							Room {sysid}/{roomID}
						</h2>
						<div className={cls['room-devices']}>
							{devices.map((device) => (
								<p key={device.id}>{device.alias}</p>
							))}
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
