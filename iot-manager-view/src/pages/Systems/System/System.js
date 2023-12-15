import React, { useEffect, useContext, useState } from 'react';
import BasicPage from '../../BasicPage';
import UserContext from '../../../context/UserContext';
import { useParams, Navigate } from 'react-router-dom';
import config from '../../../config.json';

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

	// create protected component
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	var content = <p>No system found</p>;
	if (system !== null) {
		content = (
			<div>
				{system.id} <br />
				{system.name} <br />
				{system.desc} <br />
				{system.owner}
			</div>
		);
	}
	return <BasicPage>{content}</BasicPage>;
};

export default System;
