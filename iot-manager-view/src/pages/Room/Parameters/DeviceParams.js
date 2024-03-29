/**
 * @author xponec01
 * @brief Modules prepared for controling parameters of the device
 */

import React from 'react';
import { StateParam, FunctionParam, SettingParam } from './SingleParam';
import cls from './styles/deviceParams.module.css';

const DeviceParams = ({ params, onValueChange }) => {
	/* parse states */
	const states = params.filter((item) => item.type === 'state');
	const currentStates = states.map((param) => {
		return (
			<StateParam
				key={param.id}
				type={param.type}
				name={param.name}
				value={param.value}
			/>
		);
	});

	/* parse functions */
	const functions = params.filter((item) => item.type === 'function');
	const currentFunctions = functions.map((param) => {
		return (
			<FunctionParam
				key={param.id}
				paramid={param.id}
				value={param.value}
				name={param.name}
				onValueChange={onValueChange}
			/>
		);
	});

	/* parse settings */
	const settings = params.filter((item) => item.type === 'setting');
	const currentSettings = settings.map((param) => {
		return (
			<SettingParam
				key={param.id}
				paramid={param.id}
				value={param.value}
				name={param.name}
				minVal={param.minVal}
				maxVal={param.maxVal}
			/>
		);
	});

	return (
		<>
			<div className={cls['device-params']}>
				{currentStates?.length > 0 && (
					<p className={cls['mini-header']}>Current State</p>
				)}
				{currentStates}

				{(currentSettings?.length > 0 || currentFunctions?.length > 0) && (
					<p className={cls['mini-header']}>Settings</p>
				)}
				{currentSettings}
				<p className={cls['mini-header']}></p>
				{currentFunctions}
			</div>
		</>
	);
};

export default DeviceParams;
