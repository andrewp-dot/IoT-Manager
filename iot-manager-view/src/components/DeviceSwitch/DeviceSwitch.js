import React, { useState } from 'react';
import Checkbox from '../../UI/Checkbox';
import config from '../../config.json';

const DeviceSwitch = ({ devid, initialState, onStatusChange }) => {
	const [deviceState, setDeviceState] = useState(initialState);

	const toogleStatusHandler = async (status, devid) => {
		const statusToStr = status ? 'off' : 'on';
		if (status !== 'err') {
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
					setDeviceState(status);
					if (onStatusChange) {
						onStatusChange();
					}
				}
				const errorMessage = await response.json();
				console.log(errorMessage);
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<Checkbox
			id={devid}
			status={deviceState === 'on'}
			onStatusChange={toogleStatusHandler}
		/>
	);
};

export default DeviceSwitch;
