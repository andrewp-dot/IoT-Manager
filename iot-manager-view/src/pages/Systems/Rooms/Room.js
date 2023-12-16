import React from 'react';
import Card from '../../../UI/Card';
import Checkbox from '../../../UI/Checkbox';
import cls from './styles/rooms.module.css';

const Room = ({ name, devices }) => {
	const toogleValueChangeHandler = (val) => {
		console.log(val);
	};

	const currentDevices = devices.map((device, index) => {
		return (
			<div className={cls['device-preview']}>
				{device.alias}
				<Checkbox
					id={index}
					value={device.status}
					onValueChange={toogleValueChangeHandler}
				/>
			</div>
		);
	});
	return (
		<Card>
			<div className={cls['room']}>
				<h2 className={cls['title']}>{name}</h2>
				<div className={cls['devices-preview-container']}>
					<div className={cls['devices-preview']}>{currentDevices}</div>
				</div>
			</div>
		</Card>
	);
};

export default Room;
