import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NewPlanForm from "../../components/NewPlanForm/NewPlanForm";
import NewTraining from "../../components/TodayTraining/TodayTraining";

export default class TrainingDiary extends Component {
  state = {
    showNewTrainingPlan: false,
    showTodayTraining: false,
    disableTrainingPlan: false,
    disableTodayPlan: false
  };

  showNewTrainingPlan = () =>
    this.setState({
      showNewTrainingPlan: true,
      showTodayTraining: false,
      disableTodayPlan: true
    });

  showTodayTraining = () =>
    this.setState({
      showNewTrainingPlan: false,
      showTodayTraining: true,
      disableTrainingPlan: true
    });

  disabledOffTodayPlan = () => this.setState({ disableTodayPlan: false });
  showOffNewPlan = () => this.setState({ showNewTrainingPlan: false });

  render() {
    return (
      <section className="TrainingDiary">
        <Button
          onClick={this.showNewTrainingPlan}
          size="lg"
          variant="primary"
          disabled={this.state.disableTrainingPlan}
        >
          Stwórz plan treningowy
        </Button>
        <Button
          onClick={this.showTodayTraining}
          size="lg"
          variant="success"
          disabled={this.state.disableTodayPlan}
        >
          Wprowadź dzisiejszy trening
        </Button>
        {this.state.showNewTrainingPlan ? (
          <NewPlanForm
            showOff={this.showOffNewPlan}
            disabledOff={this.disabledOffTodayPlan}
          />
        ) : null}
        {this.state.showTodayTraining ? <NewTraining /> : null}
      </section>
    );
  }
}
