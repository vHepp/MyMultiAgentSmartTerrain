import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import '../Styles/Tile.css'
import { BoardContext } from '../contexts/boardContext';


const Tile = (props) => {
	const { state, dispatch } = useContext(BoardContext)

	const [i, setI] = useState(props.i);
	const [j, setJ] = useState(props.j);
	/* const [decay, setDecay] = useState(props.decay);
	const [sources, setSources] = useState(props.sources) */
	const [val, setVal] = useState([])

	const [isSource, setIsSource] = useState(props.isSource)

	useEffect(() => {
		if (state) {

			let newVal = []
			for (let c = 0; c < state.sources.length; c++) {
				let diff = state.sources[c].prob - (state.sources[c].decay *
					(Math.abs(i - state.sources[c].row) + Math.abs(j -
						state.sources[c].column)))

				if (diff >= 0) {
					newVal[c] = diff;
				}
				else {
					newVal[c] = 0;
				}
			}

			setVal(newVal)
		}

	}, [state])


	const handleClick = (s) => {
		console.log(`Clicked ${i}, ${j} #${s}`)

		let newSources = state.sources

		if (state.sources[s].row !== i || state.sources[s].column !== j) {


			newSources[s] = {
				row: i,
				column: j,
				prob: state.sources[s].prob,
				decay: state.sources[s].decay
			}

			//console.table(newSources)

			dispatch({ type: "BOARD", payload: { sources: newSources } })
			console.table(state.sources)
		} else {
			console.log(`Tile ${i}, ${j} is already source #${s}\'s source`)
		}

	}

	return (
		<div className='Tile'>
			<div className='Tile-Info'>
				{val.map(e => {
					return (
						<div>
							{e / 100}
						</div>
					)
				})}

			</div>
			<div className='Tile-Buttons'>
				{val.map((e, i) => {
					return (
						<div>
							<button style={{ padding: "1px" }} onClick={() => {
								handleClick(i)
							}}>{i}</button>
						</div>
					)
				})}
			</div>
			{/* <button style={{ padding: "1px" }} onClick={() => {
				handleClick(0)
			}}>0</button>
			<button style={{ padding: "1px" }} onClick={() => {
				handleClick(1)
			}}>1</button>
			<button style={{ padding: "1px" }} onClick={() => {
				handleClick(2)
			}}>2</button>
			<button style={{ padding: "1px" }} onClick={() => {
				handleClick(3)
			}}>3</button> */}
		</div>
	)

}

export default Tile