/**
 * @author xponec01
 * @brief Displays room card on system detail page
 */

import React from 'react';
import Card from '../../../UI/Card';
import DeviceSwitch from '../../../components/DeviceSwitch/DeviceSwitch';
import config from '../../../config.json';
import { useNavigate } from 'react-router-dom';
import cls from './styles/rooms.module.css';

const Room = ({ roomid, name, devices, sysid, updateRooms }) => {
	const navigate = useNavigate();

	const handleOnDragDevice = (e, devid, prevRoomId) => {
		e.dataTransfer.setData(
			'application/json',
			JSON.stringify({
				devid: devid,
				prevRoom: prevRoomId,
			})
		);
	};

	const currentDevices = devices.map((device) => {
		return (
			<div
				key={device.id}
				className={cls['device-preview']}
				onDragStart={(e) => handleOnDragDevice(e, device.id, roomid)}
				draggable
			>
				{device.alias}
				<DeviceSwitch devid={device.id} initialState={device.status} />
			</div>
		);
	});

	const navigateToRoom = (e) => {
		if (
			e.target.classList.contains(cls['room']) ||
			e.target.classList.contains(cls['title'])
		) {
			navigate('/systems/' + sysid + '/' + roomid);
		}
	};

	const moveDeviceFromToRoom = async (deviceData) => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({ ...deviceData, request: 'moveDeviceToRoom' }),
			});

			if (response.ok) {
				updateRooms();
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	const dropDeviceToRoom = (e, roomid) => {
		const draggedDevice = e.dataTransfer.getData('application/json');
		const draggedDeviceObject = JSON.parse(draggedDevice);
		moveDeviceFromToRoom({ ...draggedDeviceObject, nextRoom: roomid });
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
	};

	return (
		<Card>
			<div
				className={cls['room']}
				onClick={navigateToRoom}
				onDrop={(e) => dropDeviceToRoom(e, roomid)}
				onDragOver={(e) => dragOverHandler(e)}
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
