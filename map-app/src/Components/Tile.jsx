import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import '../Styles/Tile.css'
import { BoardContext } from '../contexts/boardContext';


const Tile = (props) => {
	const { state, dispatch } = useContext(BoardContext)

	const [i, setI] = useState(props.i);
	const [j, setJ] = useState(props.j);
	const [decay, setDecay] = useState(props.decay);
	const [sources, setSources] = useState(props.sources)
	const [val, setVal] = useState(0.0)
	const [isSource, setIsSource] = useState(props.isSource)


	//console.log(`${i},${j} diff: ${val}`)

	useEffect(() => {

		//console.log(state)

		if (state) {
			if (!isSource) {
				let diff = state.sources[0].prob - (decay * (Math.abs(i - state.sources[0].row) + Math.abs(j - state.sources[0].column)))

				if (diff >= 0) {
					setVal(diff);
				}
				else {
					setVal(0);

				}
			}
			else {
				setVal(sources[0].prob)
			}
		}
		else {
			setVal(0.0)
		}

		return () => {

		}
	}, [state])


	const handleClick = () => {
		console.log(`Clicked ${i}, ${j}`)

		setSources([{
			row: i,
			column: j,
			prob: sources[0].prob,
			decay: decay
		}])

		dispatch({ type: "BOARD", payload: { sources: sources } })
	}

	return (
		<div className='Tile'>
			{/* ({i},{j}) */}
			<div className='Tile-Info'>
				<div>
					{val / 100}
				</div>
				{/* <div>
					{val / 100}
				</div>
				<div>
					{val / 100}
				</div>
				<div>
					{val / 100}
				</div> */}
			</div>
			<button style={{ /* fontSize: "10px", */ padding: "1px" }} onClick={() => handleClick()}>Source</button>
		</div>
	)

}

export default Tile