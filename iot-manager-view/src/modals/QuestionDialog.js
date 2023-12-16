import React from 'react';
import Dialog from './Dialog';
import Card from '../UI/Card';
import Button from '../UI/Button';
import cls from './styles/questionDialog.module.css';

const QuestionDialog = ({ question, onYes, onNo, onClose }) => {
	return (
		<Dialog onClose={onClose}>
			<Card width='200px' height='200px'>
				<div className={cls['question']}>{question}</div>
				<div className={cls['controls']}>
					<Button inverseStyle={true} onClick={onYes}>
						Yes
					</Button>
					<Button onClick={onNo}>No</Button>
				</div>
			</Card>
		</Dialog>
	);
};

export default QuestionDialog;
