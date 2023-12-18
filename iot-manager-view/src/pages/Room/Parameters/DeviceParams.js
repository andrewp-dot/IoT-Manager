/**
 * @author xponec01
 * @brief Modules prepared for controling parameters of the device
 */

import React from 'react';
import { StateParam, FunctionParam, SettingParam } from './SingleParam';
import cls from './styles/deviceParams.module.css';

const DeviceParams = ({ params }) => {
	params = [
		{ id: 1, type: 'state' },
		{ id: 2, type: 'setting' },
		{ id: 3, type: 'function' },
		{ id: 4, type: 'function' },
	];

	/* parse states */
	const states = params.filter((item) => item.type === 'state');
	const currentStates = states.map((param) => {
		return <StateParam key={param.id} type={param.type} />;
	});

	/* parse functions */
	const functions = params.filter((item) => item.type === 'function');
	const currentFunctions = functions.map((param) => {
		return <FunctionParam key={param.id} type={param.type} />;
	});

	/* parse settings */
	const settings = params.filter((item) => item.type === 'setting');
	const currentSettings = settings.map((param) => {
		return <SettingParam key={param.id} type={param.type} />;
	});

	return (
		<div className={cls['device-params']}>
			<p className={cls['mini-header']}>Current State</p>
			{currentStates}

			{(currentSettings?.length > 0 || currentFunctions?.length > 0) && (
				<p className={cls['mini-header']}>Settings</p>
			)}
			{currentSettings}
			<p className={cls['mini-header']}></p>
			{currentFunctions}
		</div>
	);
};

export default DeviceParams;
