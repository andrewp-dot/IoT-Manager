/**
 * @author xponec01
 * @brief Component for room addition
 */

import React, { useEffect, useRef, useState } from 'react';
import Card from '../../../UI/Card';
import cls from './styles/rooms.module.css';

/**
 *
 * @param createRoom function that creates room in parent component
 * @returns
 */
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
					<div className={cls['add-room']}>
						<h3>New Room Name</h3>
						<input
							ref={roomInputRef}
							type='text'
							onKeyDown={handleChangeRoomName}
							onBlur={() => setAddRoom(false)}
						/>
					</div>
				) : (
					<div className={cls['add-room-preview']}>+</div>
				)}
			</div>
		</Card>
	);
};

export default AddRoom;
