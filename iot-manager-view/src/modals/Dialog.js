import React from 'react';

/**
 * Create dialog with opening value
 */
const Dialog = ({ children }) => {
	return <div className={cls['dialog']}>{children}</div>;
};

export default Dialog;
