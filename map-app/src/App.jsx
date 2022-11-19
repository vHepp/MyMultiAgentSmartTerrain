import './App.css';
import Board from './Components/Board';
import { useReducer, useMemo } from 'react';

import { reducer, initialState } from './reducers/boardReducer';
import { BoardContext } from './contexts/boardContext';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <div className="App">
      <BoardContext.Provider value={value}>
        <Board />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
