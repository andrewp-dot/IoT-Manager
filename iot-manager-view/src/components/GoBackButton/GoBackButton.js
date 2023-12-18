/**
 * @author xponec01
 * @brief  Button for going on previous page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import cls from './styles/goBackButton.module.css';

const GoBackButton = () => {
	const navigate = useNavigate();

	return (
		<button className={cls['go-back']} onClick={() => navigate(-1)}>
			<FontAwesomeIcon icon={faArrowLeft} />
		</button>
	);
};

export default GoBackButton;
