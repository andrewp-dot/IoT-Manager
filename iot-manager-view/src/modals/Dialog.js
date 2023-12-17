/**
 * @author xponec01
 * @brief Dialog warpping component
 */

import React from 'react';
import { createPortal } from 'react-dom';
import cls from './styles/dialog.module.css';

/**
 * @param onClose parent component function for closing dialog
 * @param children content of the dialog
 * @returns ChangePasswordDialog component
 */
const Dialog = ({ children, onClose }) => {
	const closeDialog = (e) => {
		if (e.target.classList.contains(cls['dialog'])) {
			onClose();
		}
	};
	return (
		<>
			{createPortal(
				<div className={cls['dialog']} onClick={closeDialog}>
					{children}
				</div>,
				document.getElementById('modal')
			)}
		</>
	);
};

export default Dialog;
