import React from 'react'
import Tile from './Tile.jsx'
import '../Styles/Board.css'
import { useContext, useState, useEffect } from 'react'

import { BoardContext } from '../contexts/boardContext';

const Board = () => {

	const { state, dispatch } = useContext(BoardContext)

	const n = 10, m = 10;


	const [sources, setSources] = useState([
		{
			row: 1,
			column: 1,
			prob: 75,
			decay: 5
		}
	])

	const decay = 5;

	useEffect(() => {
		dispatch({ type: "BOARD", payload: { sources: sources } })
		//console.log(state)

	}, [dispatch, sources]);


	const [board, setBoard] = useState([]);

	if (board.length <= 0) {


		for (let i = 0; i < n; i++) {
			board[i] = [];
			for (let j = 0; j < m; j++) {
				board[i].push(<Tile key={`${i} ${j}`} i={i} j={j} sources={sources} decay={decay} isSource={false} />);
			}
		}
	}

	//console.table(board)

	/* useEffect(() => {
		console.table(sources)

		let newBoard = []

		for (let i = 0; i < n; i++) {
			newBoard[i] = [];
			for (let j = 0; j < m; j++) {
				newBoard[i].push(<Tile key={`${i} ${j}`} i={i} j={j} sources={sources} setSources={setSources} decay={decay} isSource={false} />);
			}
		}

		setBoard(newBoard)

		return () => {
			//second
		}
	}, [sources, setBoard])
 */


	return (
		<div className='Board-wrapper'>
			<div className="Board">{board}</div>
		</div>
	)
}

export default Board