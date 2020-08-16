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
  constructor() {
    super();
    this.state = {
      scores: [[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // scoresInitializer() {
  //   console.log(this.props)
  //   if(this.props) {
  //     let scoresArray = [];
  //     for(let i=1; i < 10; i++) {
  //       let holeArray = []
  //       for(let i=0; i < this.props.number; i++) {
  //         holeArray.push(
  //           0
  //         )
  //       }
  //       scoresArray.push(holeArray);
  //     }
  //     console.log(scoresArray)
  //     return scoresArray;
  //   } else {
  //     return [];
  //   }
  // }

  handleChange({ target }) {
    let holeIndex = target.dataset.holeNumber;
    let playerIndex = target.dataset.playerNumber;

    this.setState(state => {
      state.scores[holeIndex][playerIndex] = target.value;

      return {
        scores: state.scores
      };
    });
  }

  holesTable() {
    const numberHoles = [];
    for(let i=1; i < 10; i++) {
      numberHoles.push(
        <tr>
          <td>{i}</td>
          {this.playersInputs(i-1, this.state.scores[i-1])}
        </tr>
      )
    }
    numberHoles.push(
      <tr>
        <td>Total</td>
        {this.playersTotals()}
      </tr>
    )

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

  playersTotals() {
    const totalValues = [];

    for(let i=1; i <= this.props.number; i++) {
      let playerScores = this.state.scores.map(x => x[i-1]);
      const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
      totalValues.push(
        <td>
          {playerScores.reduce(reducer)}
        </td>
      )
    }

    return totalValues;
  }

  playersInputs(holeIndex, scores) {
    const numberInputs = [];

    for(let i=1; i <= this.props.number; i++) {
      numberInputs.push(
        <td><input
          type="number"
          name="playerScores"
          placeholder="0"
          value={scores[i-1]}
          onChange={ this.handleChange }
          data-player-number={i-1}
          data-hole-number={holeIndex}
        /></td>
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

