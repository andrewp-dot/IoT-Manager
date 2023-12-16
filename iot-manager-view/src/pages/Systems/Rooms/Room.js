import React from 'react';
import Card from '../../../UI/Card';
import Checkbox from '../../../UI/Checkbox';
import config from '../../../config.json';
import { useNavigate } from 'react-router-dom';
import cls from './styles/rooms.module.css';

const Room = ({ roomid, name, devices, sysid }) => {
	const navigate = useNavigate();
	const toogleStatusHandler = async (status, devid) => {
		const statusToStr = status ? 'off' : 'on';
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					devid: devid,
					status: statusToStr,
					request: 'setDeviceStatus',
				}),
			});
			if (response.ok) {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
		console.log(status);
	};

	const currentDevices = devices.map((device) => {
		const statusToBool = device.status === 'on';
		console.log(statusToBool);
		return (
			<div key={device.id} className={cls['device-preview']}>
				{device.alias}
				<Checkbox
					id={device.id}
					status={statusToBool}
					onStatusChange={toogleStatusHandler}
				/>
			</div>
		);
	});
	return (
		<Card>
			<div
				className={cls['room']}
				onClick={() => navigate('/systems/' + sysid + '/' + roomid)}
			>
				<h2 className={cls['title']}>{name}</h2>
				<div className={cls['devices-preview-container']}>
					<div className={cls['devices-preview']}>{currentDevices}</div>
				</div>
			</div>
		</Card>
	);
};

export default Room;
