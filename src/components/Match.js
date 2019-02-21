import React, { Component } from "react";
import MatchPerformance from "./MatchPerformance";

class Match extends Component {

  render() {
    let { matchIndex, visible, matchData } = this.props;
    return (
      <div>
        {visible && ( //display match details only when mouse hovers over event
          <div>
            <p>
              <strong>
                Match {matchIndex}:{" "}
                {matchData.information.team1_kills} -{" "}
                {matchData.information.team2_kills}
              </strong>
            </p>
            <ul>
              <table>
                <tbody>
                  <th>
                    <MatchPerformance teamStats={matchData.detailed.team1} />
                  </th>
                  <th>
                    <MatchPerformance teamStats={matchData.detailed.team2} />
                  </th>
                </tbody>
              </table>
              <div>
                <p>
                  {" "}
                  VPGames Player of the Game:{" "}
                  {matchData.detailed.playerOfTheGame.user.name}
                </p>
                <img
                  class="playerLogo"
                  src={matchData.detailed.playerOfTheGame.user.logo}
                  alt="Player of the Game's picture"
                />
              </div>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Match;