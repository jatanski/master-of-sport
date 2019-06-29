import React, { Component } from "react";
import FirstView from "./views/FirstView/FirstView";
import RegisterView from "./views/RegisterView/RegisterView";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";
import DesktopMenu from "./views/MenuDesktop/MenuDesktop";
import CalculatorCalories from "./views/CalculatorCalories/CalculatorCalories";
import calculatorBMI from "./views/CalculatorBMI/CalculatorBMI";
import MyPlans from "./views/MyPlans/MyPlans";
import Statistics from "./views/Statistics/Statistics";
import Circuits from "./views/Circuits/Cirtuits";
import TrainingDiary from "./views/TrainingDiary/TrainingDiary";
import WorkoutPlans from "./views/WorkoutPlans/WorkoutPlans";
import Menus from "./views/Menus/Menus";
import Profil from "./views/Profil/Profil";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          {this.props.loginStatus ? <DesktopMenu /> : null}
          <Route exact path="/" component={FirstView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
          <Route path="/me" component={MainView} />
          <Route path="/calculator" component={CalculatorCalories} />
          <Route path="/bmi" component={calculatorBMI} />
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
