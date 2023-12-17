import React from 'react';
import Toolbar from '../../../components/ToolBar/Toolbar';
import Tool from '../../../components/ToolBar/Tool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faUserPlus,
	faX,
} from '@fortawesome/free-solid-svg-icons';

const SystemToolbar = ({ isOwner, onAddUser, onEdit, onRemove }) => {
	return (
		<Toolbar>
			<Tool
				onClick={() => {
					console.log('add user to system');
				}}
			>
				<FontAwesomeIcon icon={faUserPlus} />
			</Tool>

			<Tool
				onClick={() => {
					console.log('removeSystem');
				}}
			>
				<FontAwesomeIcon icon={faX} />
			</Tool>
			{isOwner && (
				<Tool
					onClick={() => {
						console.log('edit');
					}}
				>
					<FontAwesomeIcon icon={faPenToSquare} />
				</Tool>
			)}
		</Toolbar>
	);
};

export default SystemToolbar;
