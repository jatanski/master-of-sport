import React, { Component } from "react";
import FirstView from "./views/FirstView/FirstView";
import RegisterView from "./views/RegisterView/RegisterView";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={FirstView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/login" component={LoginView} />
        <Route path="/me" component={MainView} />
      </Router>
    );
  }
}
