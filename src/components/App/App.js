import React, { useEffect, useReducer } from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button';
import Modal from '../../components/Modal/Modal';
import NewBoardForm from '../../components/NewBoardForm/NewBoardForm';
import StatusMessage from '../StatusMessage/StatusMessage';
import { ACTIONS } from '../../services/Solver/constants';
import Solver from '../../services/Solver/solver';
import { appReducer, initialState } from './reducer';
import './style.css';

const app = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const {
		isSolving,
		initialBoardParsed,
		initialBoardState,
		solveBoardState,
		newBoardString,
		timerSolveBoard,
		timeElapsed,
		openModal,
		modalError,
	} = state;

	useEffect(() => {
		const raw = localStorage.getItem('data');
		dispatch({ type: ACTIONS.RELOAD, payload: JSON.parse(raw) });
	}, []);

	useEffect(() => {
		localStorage.setItem('data', JSON.stringify(state));
	}, [state]);

	const solverHandler = () => {
		dispatch({ type: ACTIONS.SOLVE });

		Solver(initialBoardParsed).then((result) => {
			dispatch({ type: ACTIONS.SUCCESS, result: result });
		});
	};


	return (
		<div className="App">

			<div className="App-body App-container">
				<div className="App-game-panel">

					<Board
						classes="game-board"
						board={initialBoardState}
						name="initial"
					/>
					<div className="buttons-row">
						<Button
							classes="btn btn-small"
							click={() => dispatch({ type: ACTIONS.DEFAULT })}
							label="Use Default Board"
						/>
						<Button
							classes="btn btn-small"
							click={() => dispatch({ type: ACTIONS.OPEN })}
							label="Load New Board"
						/>

					</div>
				</div>

				<div className="solve-panel">
					<Button
						classes="btn Solve"
						isSpinning={isSolving}
						click={solverHandler}
						label="Solve"
					/>
					<StatusMessage
						classes="App-message-row"
						status={timerSolveBoard}
						timeElapsed={timeElapsed}
					/>
				</div>
				<div className="App-game-panel">


					<Board classes="game-board" board={solveBoardState} name="solver" />
					<div className="buttons-row">
						<Button
							classes="btn btn-small marginLeft10"
							click={() => dispatch({ type: ACTIONS.CLEAR })}
							label="Clear"
						/>
					</div>
				</div>
			</div>
			<Modal
				show={openModal}
				modalClosed={() => dispatch({ type: ACTIONS.CLOSE })}
			>
				<NewBoardForm
					modalClosed={() => dispatch({ type: ACTIONS.CLOSE })}
					changed={(e) =>
						dispatch({
							type: ACTIONS.SET,
							field: 'newBoardString',
							value: e.target.value,
						})
					}
					click={() => dispatch({ type: ACTIONS.CHANGE })}
					currentStringBoard={newBoardString}
					error={modalError}
					randomPuzzle={() => dispatch({ type: ACTIONS.RANDOM })}
				/>
			</Modal>
		</div>
	);
};

export default app;
