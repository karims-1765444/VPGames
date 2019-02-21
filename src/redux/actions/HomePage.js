import {
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_SUCCESS,
  FILTER_EVENTS
} from "../constants/HomePage";
import firebase from "firebase/app";
import "firebase/firestore";

//dispatches GET_ALL_EVENTS to signal beginning of fetch process
//fetches all events in the database and dispatches them to the reducer
export function getAllEvents(){
  return dispatch => {
    dispatch({
      type: GET_ALL_EVENTS
    });

  let allEvents = firebase.firestore().collection("events");
  var events = [];
  return allEvents.get().then(snapshot => {
    snapshot.forEach(doc => {
      events.push(doc.data());
    });
    dispatch({
      type: GET_ALL_EVENTS_SUCCESS,
      payload: events
    })
  }); 
  }
}

//sends the user input to the reducer
export function filterEvents(searchString = "") {
  return dispatch => {
    dispatch({
      type: FILTER_EVENTS,
      payload: searchString
    });
  };
}
