import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const StartGame = () => {
  const [showGameInfo, setGameInfo] = React.useState(false)
  const onClick = () => setGameInfo(true)
  return (
    <div>
      <input type="submit" value="Start Game" onClick={onClick} />
      { showGameInfo ? <GameInfo /> : null }
    </div>
  )
}

const GameInfo = () => (
  <div id="info" className="game-info">
    <label>How many players?</label>
    <input type="number" value="0" />
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    <StartGame />
  </React.StrictMode>,
  document.getElementById('root')
);

