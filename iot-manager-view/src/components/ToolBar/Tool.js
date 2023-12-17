/**
 * @author xponec01
 * @brief Component that tool button for toolbar.
 */

import React from 'react';
import cls from './styles/toolbar.module.css';

/**
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
