/**
 * @author xponec01
 * @brief Component that creates toolbar wrapper.
 */

import React from 'react';
import cls from './styles/toolbar.module.css';
import Tool from './Tool';

/**
 * Creates toolbar of the site
 * @param children should be tools placed in there
 * @returns toolbar wrapping component
 */
const Toolbar = ({ children }) => {
	return <div className={cls['toolbar']}>{children}</div>;
};

export default Toolbar;
