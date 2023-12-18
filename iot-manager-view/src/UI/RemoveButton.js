/**
 * @author xponec01
 * @brief UI button component
 */
import React from 'react';
import cls from './styles/removeButton.module.css';

/**
 *
 * @param style button inline style properties
 * @param type button type
 * @param onClick function executed when clicked on button
 * @param children children nodes
 * @param disabled if true, button is disabled
 * @returns
 */
const RemoveButton = ({ style, type, onClick, children, disabled }) => {
	return (
		<button
			style={style}
			className={`${cls['remove-button']} ${disabled ? cls['disabled'] : ''}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default RemoveButton;
