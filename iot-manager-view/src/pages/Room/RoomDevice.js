/**
 * @author xponec
 * @brief Component for display device on room page
 */

import React from 'react';
import LogoutButton from '../../UI/LogoutButton';
import DeviceParams from './Parameters/DeviceParams';
import config from '../../config.json';
import cls from './styles/roomPage.module.css';

/**
 *
 * @param device device data to be desplayed
 * @param onDelete function that updates devices in room
 * @returns
 */
const RoomDevice = ({ device, onDelete }) => {
	const removeDevice = async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({ devid: device.id, request: 'deleteDevice' }),
			});

			if (response.ok) {
				onDelete();
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={cls['device']}>
			<div className={cls['device-header']}>
				<div className={cls['alias']}>{device.alias}</div>
				<div className={cls['status']}>{device.status}</div>
			</div>

			<DeviceParams params={device.params} />
			<div className={cls['controls']}>
				<div className={cls['remove-device']} onClick={onDelete}>
					<LogoutButton onClick={removeDevice}>Remove</LogoutButton>
				</div>
			</div>
		</div>
	);
};

export default RoomDevice;
