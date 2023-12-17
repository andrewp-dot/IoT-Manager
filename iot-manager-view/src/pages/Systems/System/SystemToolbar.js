/**
 * @author xponec01
 * @brief System toolbar component
 */

import React from 'react';
import Toolbar from '../../../components/ToolBar/Toolbar';
import Tool from '../../../components/ToolBar/Tool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faUserPlus,
	faX,
} from '@fortawesome/free-solid-svg-icons';

/**
 *
 * @param isOwner boolean; true if logged user is owner
 * @param isEditable boolean; true if system is in editing state
 * @param onAddUser function for adding user
 * @param onEdit function to enter edit mode
 * @param onRemove delete system function
 * @returns
 */
const SystemToolbar = ({
	isOwner,
	isEditable,
	onAddUser,
	onEdit,
	onDeleteSystem,
}) => {
	const editableColor = isEditable ? 'var(--color-secondary)' : '';
	return (
		<Toolbar>
			<Tool onClick={onAddUser}>
				<FontAwesomeIcon icon={faUserPlus} />
			</Tool>

			<Tool onClick={onDeleteSystem}>
				<FontAwesomeIcon icon={faX} />
			</Tool>
			{isOwner && (
				<Tool onClick={onEdit}>
					<FontAwesomeIcon
						icon={faPenToSquare}
						style={{ color: editableColor }}
					/>
				</Tool>
			)}
		</Toolbar>
	);
};

export default SystemToolbar;
