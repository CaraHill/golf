import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const StartGame = () => {
  const [showGameInfo, setGameInfo] = React.useState(false);
  const onClick = () => setGameInfo(true);
  return (
    <div>
      <input type="submit" value="Start Game" onClick={onClick} />
      { showGameInfo ? <GameInfo /> : null }
    </div>
  )
}

class GameInfo extends React.Component {
  render() {
    return (
      <div id="info" className="game-info">
        <label>How many players?</label>
        <input type="number" value={0} />
        <PlayerTable />
      </div>
    )
  }
}

const PlayerTable  = () => {
  const holesTable = [];

  for(let i=1; i < 10; i++) {
    holesTable.push(
      <tr>
        <td>{i}</td>
        <td>0</td>
        <td>0</td>
      </tr>
    )
  }
  return (
    <table>
      <tr>
        <th>
          Holes
        </th>
        <th>
          Player 1
        </th>
        <th>
          Player 2
        </th>
      </tr>
      {holesTable}
    </table>
  )
}

class Game extends React.Component {
  render() {
    return (
      <StartGame />
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

