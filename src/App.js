import React, { Component } from "react";
import CalculatorBMI from "./views/CalculatorBMI/CalculatorBMI";
import CalculatorCalories from "./views/CalculatorCalories/CalculatorCalories";
import Circuits from "./views/Circuits/Cirtuits";
import FirstView from "./views/FirstView/FirstView";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";
import MenuDesktop from "./views/MenuDesktop/MenuDesktop";
import MenuMobile from "./views/MenuMobile/MenuMobile";
import Menus from "./views/Menus/Menus";
import MyPlans from "./views/MyPlans/MyPlans";
import RegisterView from "./views/RegisterView/RegisterView";
import Profil from "./views/Profil/Profil";
import Statistics from "./views/Statistics/Statistics";
import TrainingDiary from "./views/TrainingDiary/TrainingDiary";
import WorkoutPlans from "./views/WorkoutPlans/WorkoutPlans";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { allActions } from "./redux/store";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    if (token) allActions.login();
  }
  render() {
    return (
      <div className="app">
        <Router>
          {this.props.loginStatus ? <MenuDesktop /> : null}
          {this.props.loginStatus ? <MenuMobile /> : null}
          <Route exact path="/" component={FirstView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
          <Route path="/me" component={MainView} />
          <Route path="/calculator" component={CalculatorCalories} />
          <Route path="/bmi" component={CalculatorBMI} />
          <Route path="/myplans" component={MyPlans} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/circuits" component={Circuits} />
          <Route path="/diary" component={TrainingDiary} />
          <Route path="/workoutplans" component={WorkoutPlans} />
          <Route path="/menus" component={Menus} />
          <Route path="/profil" component={Profil} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.login.loginStatus
});

export default connect(
  mapStateToProps,
  {}
)(App);
