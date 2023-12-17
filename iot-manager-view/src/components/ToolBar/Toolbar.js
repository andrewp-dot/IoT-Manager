/**
 * @author xponec01
 * @brief Component that creates toolbar with given tools.
 */

import React from 'react';
import cls from './styles/toolbar.module.css';
import Tool from './Tool';

/**
 * Creates toolbar of the site
 * @param tools array of tools; contains object with tool name and method
 * @returns toolbar component
 */
const Toolbar = ({ tools }) => {
	const usedTools = tools || [];

	return (
		<div className={cls['toolbar']}>
			{usedTools.map((tool) => {
				return <Tool key={tool.name} name={tool.name} onClick={tool.method} />;
			})}
		</div>
	);
};

export default Toolbar;
