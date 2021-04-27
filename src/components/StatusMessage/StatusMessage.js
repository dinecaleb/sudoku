import React from 'react';
import './style.css';
import { STATUS } from '../../services/Solver/constants';

const statusMessage = (props) => {
	switch (props.status) {
		case STATUS.TIMER: {
			return (
				<div className={props.classes}>
					<h5 className="App-status-message">
						Time taken: {props.timeElapsed} ms
					</h5>
				</div>
			);
		}
		default: {
			return <div></div>;
		}
	}
};

export default statusMessage;
