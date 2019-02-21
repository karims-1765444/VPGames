import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import HomePage from "./containers/HomePage";
import "./style/main.css";
import configureStore from "./redux/store/configure-store";
import * as firebase from "firebase/app";

const store = configureStore();

var config = {
  databaseURL: "https://vpgames-6332b.firebaseio.com",
  projectId: "vpgames-6332b",
  storageBucket: "vpgames-6332b.appspot.com"
};
firebase.initializeApp(config);

  render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById("root")
);
