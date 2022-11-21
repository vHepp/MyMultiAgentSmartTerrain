import React from 'react'
import Tile from './Tile.jsx'
import '../Styles/Board.css'
import { useContext, useState, useEffect } from 'react'

import { BoardContext } from '../contexts/boardContext';

const Board = () => {

	const { state, dispatch } = useContext(BoardContext)

	const n = 10, m = 10;

	const [prob, setProb] = useState(null)
	const [decay, setDecay] = useState(null)



	const [sources, setSources] = useState([
		{
			row: 1,
			column: 1,
			prob: 75,
			decay: 5
		}
	])

	useEffect(() => {
		dispatch({ type: "BOARD", payload: { sources: sources } })
		//console.log(state)

	}, [dispatch, sources]);


	const [board, setBoard] = useState([]);

	if (board.length <= 0) {


		for (let i = 0; i < n; i++) {
			board[i] = [];
			for (let j = 0; j < m; j++) {
				board[i].push(<Tile key={`${i} ${j}`} i={i} j={j} isSource={false} />);
			}
		}
	}

	const handleUpdate = () => {

	}


	return (
		<div className='Board-component'>

			<div className='Board-wrapper'>
				<div className="Board">{board}</div>
			</div>
			<div className='info'>
				<label style={{ color: "white" }}>
					Prob:
					<input style={{ margin: "2px" }} name="probability" type="text" />
				</label>
				<label style={{ color: "white" }}>
					Decay Rate
					<input style={{ margin: "2px" }} name="" type="text" />
				</label>
				<button onClick={() => handleUpdate()}>Update</button>
			</div>


		</div>
	)
}

export default Board