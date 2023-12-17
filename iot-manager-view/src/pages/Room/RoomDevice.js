import React from 'react';
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
			<div className={cls['alias']}>{device.alias}</div>
			<div className={cls['description']}>{device.descripton}</div>
			<div className={cls['status']}>{device.status}</div>
			<div className={cls['controls']}>
				<div className={cls['remove-device']} onClick={onDelete}>
					&times;
				</div>
			</div>
		</div>
	);
};

export default RoomDevice;
