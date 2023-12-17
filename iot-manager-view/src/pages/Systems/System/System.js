import React, { useEffect, useContext, useState, useCallback } from 'react';
import Rooms from '../Rooms/Rooms';
import UserContext from '../../../context/UserContext';
import { useParams } from 'react-router-dom';
import config from '../../../config.json';
import cls from '../styles/systemDetail.module.css';
import ProtectedPage from '../../ProtectedPage';
import SystemToolbar from './SystemToolbar';
import Dialog from '../../../modals/Dialog';
import QuestionDialog from '../../../modals/QuestionDialog';

const System = () => {
	const [openDialog, setOpenDialog] = useState('');
	const [enabledEdit, setEnabledEdit] = useState(false);
	const [system, setSystem] = useState(null);
	const [editSystemData, setEditSystemData] = useState(null);
	const userCtx = useContext(UserContext);
	const { id } = useParams();

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
					description: systemData.desc,
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
		return system.desc || 'No description has been added yet.';
	};

	var content = <p>No system found</p>;
	if (system) {
		content = (
			<>
				<div className={cls['system-detail']}>
					<div className={cls['system-detail-header']}>
						{displayTitle()}
						<div className={cls['desc']}>
							<em>Description:</em> <br />
							{/* {system.desc || 'No description has been added yet.'} */}
							{displayDescription()}
						</div>
						<div className={cls['owner']}>
							<em>Owner:</em> {system.owner}
						</div>
					</div>
					<Rooms sysid={id} />
				</div>
				<SystemToolbar
					isOwner={system.owner === userCtx.user.login}
					isEditable={enabledEdit}
					onAddUser={() => setOpenDialog('addUser')}
					onDeleteSystem={() => setOpenDialog('deleteSystem')}
					onEdit={() => setEnabledEdit(!enabledEdit)}
				/>
				{openDialog === 'addUser' && (
					<Dialog onClose={() => setOpenDialog('')}>Add user dialog</Dialog>
				)}
				{openDialog === 'deleteSystem' && (
					<QuestionDialog
						question={'Are you sure you want to delete this system?'}
						onClose={() => setOpenDialog('')}
					/>
				)}
			</>
		);
	}
	return <ProtectedPage>{content}</ProtectedPage>;
};

export default System;
