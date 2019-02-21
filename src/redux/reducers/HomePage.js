import {
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_SUCCESS,
  FILTER_EVENTS
} from "../constants/HomePage";

const initialState = {
  areEventsFetched: false,
  events: [],
  displayedEvents: [],
  matches: [],
  icons: [ //footer icons
    {
      name: "Facebook",
      url: "https://www.facebook.com/VPGAMEPAGE/",
      img: "https://firebasestorage.googleapis.com/v0/b/vpgames-6332b.appspot.com/o/fbicon.png?alt=media&token=9d3a1d85-97b2-4a2e-b89e-9c5bf9afcfc0"
    },
    {
      name: "VPGame_logo",
      url: "http://www.vpgame.com",
      img: "https://firebasestorage.googleapis.com/v0/b/vpgames-6332b.appspot.com/o/vpgamelogo.png?alt=media&token=9b23bc56-7fc8-4999-97dd-c8a0ece9b306"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {

    //sets the fetched flag to false while events are being fetched
    case GET_ALL_EVENTS:
      return {
        ...state,
        areEventsFetched: false
      };

    //sets the fetched flag to true when events are fetched, initializes the events and the displayed events 
    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        areEventsFetched: true,
        events: action.payload,
        displayedEvents: action.payload
      };

    //filters events to only the ones with the search string in their team names
    case FILTER_EVENTS:
      return {
        ...state,
        displayedEvents: state.events.filter(event => {
          return event.team1_name.toLowerCase().includes(action.payload.toLowerCase()) ||
                  event.team2_name.toLowerCase().includes(action.payload.toLowerCase())
          })
       };

    default:
      return state;
  }
}
