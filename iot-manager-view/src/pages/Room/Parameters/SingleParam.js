import React, { useState } from 'react';
import Card from '../../../UI/Card';
import Checkbox from '../../../UI/Checkbox';
import cls from './styles/deviceParams.module.css';
import config from '../../../config.json';

/**
 * Switchable functionality parameter component
 * @brief Turns on / off function of the device
 *
 * @param  paramid
 * @param  name
 * @param  value
 * @returns
 */
export const FunctionParam = ({ paramid, name, value }) => {
	const [currentStatus, setStatus] = useState(value);

	const updateParamValue = async (status, paramid) => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					paramid: paramid,
					status: status,
					request: 'changeParam',
				}),
			});
			if (response.ok) {
				setStatus(!status);
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Card margin={'5px 0'}>
			<div className={cls['param']}>
				<div className={cls['func-param']}>
					<p>{name}</p>
					<Checkbox
						id={paramid}
						status={currentStatus}
						onStatusChange={updateParamValue}
					/>
				</div>
			</div>
		</Card>
	);
};

/**
 * Setting parameter component
 * @brief Set value of the parameter (for example, temperature of air condition)
 *
 * @param  paramid
 * @param  name
 * @param  value
 * @returns parameter of type setting component
 */
export const SettingParam = ({ paramid, name, value, minVal, maxVal }) => {
	return (
		<Card margin={'5px 0'}>
			<div className={cls['param']}>
				<div className={cls['setting-param']}>
					<input
						className={cls['range-input']}
						type='range'
						min={0}
						max={100}
					/>
				</div>
			</div>
		</Card>
	);
};

/**
 * State parameter component
 *
 * @brief Displays current value of parameter
 * @param  name name of the parameter
 * @param  value current value
 * @returns parameter of type state component
 */
export const StateParam = ({ name, value }) => {
	return (
		<Card margin={'5px 0'}>
			<div className={cls['param']}>
				<div>{name}</div>
				<div>{value}</div>
			</div>
		</Card>
	);
};
