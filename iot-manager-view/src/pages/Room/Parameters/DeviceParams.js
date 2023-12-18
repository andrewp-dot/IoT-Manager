/**
 * @author xponec01
 * @brief Modules prepared for controling parameters of the device
 */

import React from 'react';
import SingleParam from './SingleParam';
import cls from './styles/deviceParams.module.css';

const DeviceParams = ({ params }) => {
	params = [
		{ id: 1, type: 'state' },
		{ id: 2, type: 'setting' },
		{ id: 3, type: 'function' },
	];

	/* parse states */
	const states = params.filter((item) => item.type === 'function');
	const currentStates = states.map((param) => {
		return <SingleParam key={param.id} type={param.type} />;
	});

	/* parse functions */
	const functions = params.filter((item) => item.type === 'state');
	const currentFunctions = functions.map((param) => {
		return <SingleParam key={param.id} type={param.type} />;
	});

	/* parse settings */
	const settings = params.filter((item) => item.type === 'setting');
	const currentSettings = settings.map((param) => {
		return <SingleParam key={param.id} type={param.type} />;
	});

	return (
		<div className={cls['device-params']}>
			<p className={cls['mini-header']}>Current State</p>
			{currentStates}
			<div>
				<p className={cls['mini-header']}>Settings</p>
				<div>Sliders</div>
				{currentSettings}
				<p className={cls['mini-header']}></p>
				{currentFunctions}
			</div>
		</div>
	);
};

export default DeviceParams;
