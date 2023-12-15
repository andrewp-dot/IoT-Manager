import React from 'react';
import BasicPage from '../../BasicPage';
import { useParams } from 'react-router-dom';

const System = () => {
	const { id } = useParams();
	return <BasicPage>sys id: {id}</BasicPage>;
};

export default System;
