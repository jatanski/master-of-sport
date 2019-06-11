import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";
import NewPlanForm from "../../components/NewPlanForm/NewPlanForm";

export default class TrainingDiary extends Component {
  state = {
    showNewTrainingPlan: false,
    showTodayTraining: false
  };

  showNewTrainingPlan = () =>
    this.setState({
      showNewTrainingPlan: true,
      showTodayTraining: false
    });

  showTodayTraining = () =>
    this.setState({
      showNewTrainingPlan: false,
      showTodayTraining: true
    });

  render() {
    return (
      <section className="TrainingDiary">
        <Button onClick={this.showNewTrainingPlan} size="lg" variant="primary">
          Stwórz plan treningowy
        </Button>
        <Button onClick={this.showTodayTraining} size="lg" variant="success">
          Wprowadź dzisiejszy trening
        </Button>
        {this.state.showNewTrainingPlan ? <NewPlanForm /> : null}
      </section>
    );
  }
}
