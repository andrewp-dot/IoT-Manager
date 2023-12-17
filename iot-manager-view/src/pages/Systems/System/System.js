/**
 * @author xponec01
 * @brief Single system conponent page accessed from systems
 */

import React, { useEffect, useContext, useState, useCallback } from 'react';
import Rooms from '../Rooms/Rooms';
import UserContext from '../../../context/UserContext';
import { useParams } from 'react-router-dom';
import config from '../../../config.json';
import cls from '../styles/systemDetail.module.css';
import ProtectedPage from '../../ProtectedPage';
import SystemToolbar from './SystemToolbar';
import SystemUserHandleForm from './SystemUserHandleForm';
import Dialog from '../../../modals/Dialog';
import QuestionDialog from '../../../modals/QuestionDialog';
import { useNavigate } from 'react-router-dom';

const System = () => {
	const [openDialog, setOpenDialog] = useState('');
	const [enabledEdit, setEnabledEdit] = useState(false);
	const [system, setSystem] = useState(null);
	const [editSystemData, setEditSystemData] = useState(null);
	const userCtx = useContext(UserContext);
	const { id } = useParams();
	const navigate = useNavigate();

	/**
	 * Gets specific user system data by system id in url
	 */
	const userSystemRequest = useCallback(async () => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					id: id,
					login: userCtx.user.login,
					request: 'getSingleUserSystem',
				}),
			});
			if (response.ok) {
				const systemData = await response.json();
				setSystem(systemData);
				setEditSystemData({
					name: systemData.name,
					description: systemData.description,
				});
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	}, [id, userCtx.user.login]);

	useEffect(() => {
		userSystemRequest();
	}, [userSystemRequest]);

	const editTitleHandler = (e) => {
		setEditSystemData({ ...editSystemData, name: e.target.value });
	};

	const editDescriptionHandler = (e) => {
		setEditSystemData({ ...editSystemData, description: e.target.value });
	};

	/**
	 * Send request to edit system data
	 */
	const editSystemDataHandler = async () => {
		if (enabledEdit) {
			try {
				const response = await fetch(config.api.systems.url, {
					...config.fetchOptions,
					body: JSON.stringify({
						sysid: id,
						...editSystemData,
						request: 'editSystem',
					}),
				});
				if (response.ok) {
					userSystemRequest();
				}
				const message = await response.json();
				console.log(message);
			} catch (e) {
				console.log(e);
			}
		}
		setEnabledEdit(!enabledEdit);
	};

	/**
	 * Send request to delete system
	 */
	const deleteSystemHandler = async () => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					sysid: id,
					request: 'deleteSystem',
				}),
			});
			if (response.ok) {
				navigate('/systems');
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * Send request to add user to system
	 * @param login user where is about to be added
	 */
	const addUserToSystem = async (login) => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					login: login,
					sysid: id,
					request: 'addUserToSystem',
				}),
			});

			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * Send request to remove user from system
	 * @param login user to be removed
	 */
	const removeUserFromSystem = async (login) => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					login: login,
					sysid: id,
					request: 'removeUserFromSystem',
				}),
			});

			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * Display title or input for editing title based on editable
	 * @returns
	 */
	const displayTitle = () => {
		if (enabledEdit) {
			return (
				<input
					style={{ fontSize: '1.5rem', margin: '0.5rem 0', width: '20%' }}
					className={cls['editable-input']}
					type='text'
					value={editSystemData.name}
					onChange={editTitleHandler}
				/>
			);
		}
		return <h1 className={cls['title']}>{system.name}</h1>;
	};

	/**
	 * Display description or input for editing description based on editable
	 * @returns description
	 */
	const displayDescription = () => {
		if (enabledEdit) {
			return (
				<input
					className={cls['editable-input']}
					type='text'
					value={editSystemData.description}
					onChange={editDescriptionHandler}
				/>
			);
		}
		return system.description || 'No description has been added yet.';
	};

	/**
	 * Set content based system found
	 */
	var content = <p>No system found</p>;
	if (system) {
		content = (
			<>
				{/* display system*/}
				<div className={cls['system-detail']}>
					<div className={cls['system-detail-header']}>
						{displayTitle()}
						<div className={cls['desc']}>
							<em>Description:</em> <br />
							{displayDescription()}
						</div>
						<div className={cls['owner']}>
							<em>Owner:</em> {system.owner}
						</div>
					</div>
					<Rooms sysid={id} />
				</div>
			</>
		);
	}

	let ownerToolbar = null;

	if (system?.owner === userCtx.user.login) {
		ownerToolbar = (
			<>
				{/* tools related components */}
				<SystemToolbar
					isEditable={enabledEdit}
					onAddUser={() => setOpenDialog('addUser')}
					onRemoveUser={() => setOpenDialog('deleteUser')}
					onDeleteSystem={() => setOpenDialog('deleteSystem')}
					onEdit={() => editSystemDataHandler()}
				/>
				{openDialog === 'addUser' && (
					<Dialog onClose={() => setOpenDialog('')}>
						<SystemUserHandleForm
							action='add'
							onClose={() => setOpenDialog('')}
							userHandler={addUserToSystem}
						/>
					</Dialog>
				)}
				{openDialog === 'deleteUser' && (
					<Dialog onClose={() => setOpenDialog('')}>
						<SystemUserHandleForm
							action='delete'
							onClose={() => setOpenDialog('')}
							userHandler={removeUserFromSystem}
						/>
					</Dialog>
				)}
				{openDialog === 'deleteSystem' && (
					<QuestionDialog
						question={'Are you sure you want to delete this system?'}
						onYes={deleteSystemHandler}
						onClose={() => setOpenDialog('')}
						onNo={() => setOpenDialog('')}
					/>
				)}
			</>
		);
	}
	return (
		<ProtectedPage>
			{content}
			{ownerToolbar}
		</ProtectedPage>
	);
};

export default System;
