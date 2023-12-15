import React, { useEffect, useContext, useState } from 'react';
import BasicPage from '../../BasicPage';
import Rooms from '../Rooms/Rooms';
import UserContext from '../../../context/UserContext';
import { useParams, Navigate } from 'react-router-dom';
import config from '../../../config.json';
import cls from '../styles/systemDetail.module.css';
import ProtectedPage from '../../ProtectedPage';

const System = () => {
	const [system, setSystem] = useState(null);
	const userCtx = useContext(UserContext);
	const { id } = useParams();

	const userSystemRequest = async () => {
		console.log('load system');
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
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		userSystemRequest();
	}, []);

	var content = <p>No system found</p>;
	if (system !== null) {
		content = (
			<div className={cls['system-detail']}>
				<div className={cls['system-detail-header']}>
					<h1 className={cls['title']}>{system.name}</h1>
					<div className={cls['desc']}>
						<em>Description:</em> <br />
						{system.desc || 'No description has been added yet.'}
					</div>
					<div className={cls['owner']}>
						<em>Owner:</em> {system.owner}
					</div>
				</div>
				<Rooms />
			</div>
		);
	}
	return <ProtectedPage>{content}</ProtectedPage>;
};

export default System;
