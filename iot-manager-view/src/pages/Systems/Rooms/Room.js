import React from 'react';
import Card from '../../../UI/Card';
import Checkbox from '../../../UI/Checkbox';
import cls from './styles/rooms.module.css';

const Room = ({ name, devices }) => {
	const toogleValueChangeHandler = (val) => {
		console.log(val);
	};

	const currentDevices = devices.map((device) => {
		const statusToBool = device.status === 'on';
		console.log(device);
		return (
			<div key={device.id} className={cls['device-preview']}>
				{device.alias}
				<Checkbox
					id={device.id}
					value={statusToBool}
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
