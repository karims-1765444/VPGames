import React, { Component } from "react";
import Event from "./Event";
import Footer from "./Footer";
import Search from "./Search";

class HomePage extends Component {

  //fetches events upon homepage mount
  componentDidMount() {
    this.props.getEvents();
  }

  //filters events when user types into search bar
  handleSearch(event) {
    this.props.filterEvents(event.currentTarget.value);
  }

  render() {
    let {
      areEventsFetched,
      displayedEvents,
      events,
      matches,
      icons
    } = this.props;

    //maps every event object to a viewable list item
    let eventData = displayedEvents.map(event => {
      return (
        <li>
          <Event eventData={event} />
        </li>
      );
    });

    return (
    <div>
      <div id="page">
          <Search onChange={this.handleSearch.bind(this)} />
	    </div>
      <div id="featured-wrapper">
          {
            areEventsFetched ?
            (<ul class="style1"> {eventData} </ul>)
            :
            (<p><br/><strong>Loading events...</strong></p>) //displayed while events are being fetched

          }
      </div>
    <Footer icons={icons} />
    </div>
    );
  }
}

export default HomePage;
