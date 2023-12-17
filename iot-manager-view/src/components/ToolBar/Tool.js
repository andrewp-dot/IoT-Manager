/**
 * @author xponec01
 * @brief Component that tool button for toolbar.
 */

import React, { Children } from 'react';
import cls from './styles/toolbar.module.css';

/**
 * @param name name of the tool
 * @param method functionality of the tool
 * @returns tool component
 */
const Tool = ({ onClick, children }) => {
	return (
		<div className={cls['tool']} onClick={onClick}>
			{children}
		</div>
	);
};

export default Tool;
