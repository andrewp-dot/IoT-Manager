/**
 * @author xponec01
 * @brief Modules prepared for controling parameters of the device
 */

import React from 'react';
import cls from './styles/deviceParams.module.css';

const DeviceParams = ({ params }) => {
	return (
		<div className={cls['device-params']}>
			<h4>Parameters</h4>
		</div>
	);
};

export default DeviceParams;