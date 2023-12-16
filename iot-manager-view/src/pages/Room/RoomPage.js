import React from 'react';
import ProtectedPage from '../ProtectedPage';
import { useParams } from 'react-router-dom';
import Card from '../../UI/Card';

const RoomPage = () => {
	const { roomID } = useParams();

	// get system rooms

	return (
		<ProtectedPage>
			<Card>Room {roomID}</Card>
		</ProtectedPage>
	);
};

export default RoomPage;
