import React, { Component } from "react";
import FirstView from "./views/FirstView/FirstView";
import RegisterView from "./views/RegisterView/RegisterView";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";
import DesktopMenu from "./views/MenuDesktop/MenuDesktop";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    console.log(window.store);
    console.log(window.store.getState());
    console.log(window.store.getState().login.loginStatus);
    console.log(this.props);
    return (
      <div>
        <Router>
          {this.props.loginStatus ? <DesktopMenu /> : null}
          <Route exact path="/" component={FirstView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
          <Route path="/me" component={MainView} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.loginStatus
});

export default connect(
  mapStateToProps,
  {}
)(App);
