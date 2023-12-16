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
			<div>{device.alias}</div>
			<div className={cls['controls']}>
				{device.type}
				<a onClick={onDelete}>Remove</a>
			</div>
		</div>
	);
};

export default RoomDevice;
