import React from 'react';
import cls from './styles/deviceParams.module.css';

/**
 * Switchable functionality parameter component
 * @brief Turns on / off function of the device
 *
 * @param  devid
 * @param  paramid
 * @param  name
 * @param  value
 * @returns
 */
const functionParam = (paramid, name, value) => {
	return <div></div>;
};

/**
 * Setting parameter component
 * @brief Set value of the parameter (for example, temperature of air condition)
 *
 * @param  devid
 * @param  paramid
 * @param  name
 * @param  value
 * @returns
 */
const settingParam = (paramid, name, value, minVal, maxVal) => {
	return <div></div>;
};

/**
 * State parameter component
 *
 * @brief Displays current value of parameter
 * @param  paramid parameter id
 * @param  name name of the parameter
 * @param  value current value
 * @param  minVal minimum value for setting
 * @param  maxVal maximum value for setting
 * @returns
 */
const stateParam = (paramid, name, value) => {
	return <div></div>;
};

const SingleParam = ({ paramid, name, value, type, minVal, maxVal }) => {
	const getParamComponent = (type) => {
		switch (type) {
			case 'state':
				return stateParam(paramid, name, value, type);
			case 'function':
				return functionParam(paramid, name, value, type);
			case 'setting':
				return settingParam(paramid, name, value, minVal, maxVal);
			default:
				break;
		}
		return null;
	};

	const paramItem = getParamComponent(type);
	return <div className={cls['param']}>{paramItem}</div>;
};

export default SingleParam;
