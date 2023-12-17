/**
 * @author xponec01
 * @brief Component that tool button for toolbar.
 */

import React from 'react';
import cls from './styles/toolbar.module.css';

/**
 * @param name name of the tool
 * @param method functionality of the tool
 * @returns tool component
 */
const Tool = ({ name, method }) => {
	return (
		<div className={cls['tool']} onClick={method}>
			{name}
		</div>
	);
};

export default Tool;
