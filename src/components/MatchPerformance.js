import React, { Component } from "react";
import { TEAM_LANE_ORDER } from "../constants/TeamLaneOrder";

class MatchPerformance extends Component {
  render() {
    let { teamStats } = this.props;
    let players = TEAM_LANE_ORDER.map(lane => { //maintains consistent order by lane of player list 
      return ( (lane=="bestPlayer") ?
        <li>
          Best Performance : {teamStats["bestPlayer"].user.name} 
        </li>
        :
        <li>
          {lane.toUpperCase()} : {teamStats[lane].user.name} (Score ={" "}
          {teamStats[lane].score})
        </li>
      );
    });

    return (
      <div>
        <ul>{players}</ul>
      </div>
    );
  }
}

export default MatchPerformance;
