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
  constructor() {
    super();
    this.state = {
      numPlayers: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div id="info" className="game-info">
        <label>How many players?</label>
        <input
          type="number"
          name="numPlayers"
          placeholder="0"
          value={this.state.numPlayers}
          onChange={ this.handleChange }
        />
        <PlayerTable number={this.state.numPlayers}/>
      </div>
    )
  }
}

class PlayerTable extends React.Component {
  holesTable() {
    const numberHoles = [];

    for(let i=1; i < 10; i++) {
      numberHoles.push(
        <tr>
          <td>{i}</td>
          {this.playersInputs()}
        </tr>
      )
    }

    return numberHoles;
  }

  playersHeaders() {
    const numberPlayers = [];

    for(let i=1; i <= this.props.number; i++) {
      numberPlayers.push(
        <th>Player {i}</th>
      )
    }

    return numberPlayers;
  }

  playersInputs() {
    const numberInputs = [];

    for(let i=1; i <= this.props.number; i++) {
      numberInputs.push(
        <td>0</td>
      )
    }

    return numberInputs;
  }

  render() {
    return (
      <table>
        <tr>
          <th>
            Holes
          </th>
          {this.playersHeaders()}
        </tr>
        {this.holesTable()}
      </table>
    )
  }
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

