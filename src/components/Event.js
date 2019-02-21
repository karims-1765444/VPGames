import React, { Component } from "react";
import Team from "./Team";
import Match from "./Match";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchesVisible: false
    };
  }

  //shows match details when mouse hovers over event
  showMatchDetails() {
    this.setState({
      matchesVisible: true
    });
  }

  //hides match details when mouse leaves event
  hideMatchDetails() {
    this.setState({
      matchesVisible: false
    });
  }

  

  render() {
    let { eventData } = this.props;
    let matches = eventData.remark.match_ids.map( (match, matchIndex) => {
      return ((match.data) && //to handle cases of matches with no data
        (
        <div>
        <Match matchIndex={matchIndex+1} visible={this.state.matchesVisible} matchData={match.data}/>
        </div>
        )
        // :
        // <p>No details found</p> 
      );
    });

    return (
      <div className="event" onMouseEnter={this.showMatchDetails.bind(this)} onMouseLeave={this.hideMatchDetails.bind(this)}>
        <p>{eventData.league_en_name}</p>
        <table>
          <tr>
            <div>
              <th>
                <Team name={eventData.team1_name} logo={eventData.team1_logo} />
              </th>
              <th>
                <Team name={eventData.team2_name} logo={eventData.team2_logo} />
              </th>
            </div>
          </tr>
          <tr>
            {matches}              
          </tr>
        </table>
      </div>
    );
  }
}

export default Event;
