/**
 * @author xponec01
 * @brief Card wrapping component.
 */

import React from 'react';
import cls from './styles/cardStyles.module.css';

/**
 *
 * @param  width optional parameter for width of the card
 * @param  height optional parameter for height of the card
 * @param  backgroundColor optional parameter for background color of the card
 * @param  children content of the card
 * @returns Card component
 */
const Card = ({ width, height, backgroundColor, children }) => {
	let bgColor = backgroundColor || 'var(--color-primary)';
	return (
		<div
			style={{ width: width, height: height, backgroundColor: bgColor }}
			className={cls['card']}
		>
			{children}
		</div>
	);
};

export default Card;
