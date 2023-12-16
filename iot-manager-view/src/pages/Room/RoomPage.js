import React from 'react';
import ProtectedPage from '../ProtectedPage';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
	const { roomID } = useParams();

	// get system rooms

	return <ProtectedPage>Room {roomID}</ProtectedPage>;
};

export default RoomPage;
