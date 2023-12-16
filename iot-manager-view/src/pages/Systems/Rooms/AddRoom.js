import React, { useEffect, useRef, useState } from 'react';
import Card from '../../../UI/Card';
import cls from './styles/rooms.module.css';

const AddRoom = ({ createRoom }) => {
	const [addRoom, setAddRoom] = useState(false);
	const roomInputRef = useRef(null);

	const handleChangeRoomName = (e) => {
		if (e.key === 'Enter') {
			if (roomInputRef.current.value.trim() !== '') {
				createRoom(roomInputRef.current.value.trim());
			}
			setAddRoom(false);
		}
	};

	useEffect(() => {
		if (roomInputRef.current) {
			roomInputRef.current.focus();
		}
	}, [addRoom]);
	return (
		<Card backgroundColor={'rgba(255,255,255,0.7'}>
			<div
				className={cls['room']}
				onClick={() => {
					setAddRoom(true);
				}}
			>
				{addRoom ? (
					<input
						ref={roomInputRef}
						type='text'
						onKeyDown={handleChangeRoomName}
						onBlur={() => setAddRoom(false)}
					/>
				) : (
					'+'
				)}
			</div>
		</Card>
	);
};

export default AddRoom;
