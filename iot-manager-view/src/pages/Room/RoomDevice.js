import React from 'react';
import LogoutButton from '../../UI/LogoutButton';
import DeviceParams from './DeviceParams';
import cls from './styles/roomPage.module.css';

/**
 * TODO:
 * add parameters here
 * display params of the device
 * add access on device detail
 * in device detail add option form add and remove parameter
 */
const RoomDevice = ({ device, onDelete }) => {
	return (
		<div className={cls['device']}>
			<div className={cls['device-header']}>
				<div className={cls['alias']}>{device.alias}</div>
				<div className={cls['status']}>{device.status}</div>
			</div>
			<div className={cls['description']}>{device.descripton}</div>

			<DeviceParams params={device.params} />
			<div className={cls['controls']}>
				<div className={cls['remove-device']} onClick={onDelete}>
					<LogoutButton>Remove</LogoutButton>
				</div>
			</div>
		</div>
	);
};

export default RoomDevice;
