import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import NewTraining from "../../components/TodayTraining/TodayTraining";
import "./trainingDiary.scss";

export default class TrainingDiary extends Component {
  state = {
    showTodayTraining: false,
    disableTodayPlan: false
  };

  showTodayTraining = () =>
    this.setState({
      showNewTrainingPlan: false,
      showTodayTraining: true
    });

  disabledOffTodayPlan = () => this.setState({ disableTodayPlan: false });

  render() {
    return (
      <section className="newWorkout">
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">
              Dodaj dzisiejszy trening
            </h2>
            <p>
              Wybierz jeden z zapisanych planów treningowych i wprowadź
              dzisiejszy trening.
            </p>
            <h3 className="calculatorCalories__header-secondary">Instrukcja</h3>
            <p className="calculatorCalories__description">
              1. Kliknij w przycisk{" "}
              <span className="bold">"Wprowadź dzisiejszy trening"</span> <br />{" "}
              2. Wybierz z listy jeden z planów treningowych. <br /> 3.
              Uzupełnij okienka z powtórzeniami i obciążeniem, a następnie
              kliknij <span className="bold"> "Zapisz trening"</span>.
              <br /> Zapisane treningi możesz znaleźć w zakładce{" "}
              <span className="bold">STATYSTYKI</span>.
            </p>
          </div>

          <Button
            onClick={this.showTodayTraining}
            size="lg"
            variant="success"
            disabled={this.state.disableTodayPlan}
            className="newWorkout__startBtn"
          >
            Wprowadź dzisiejszy trening
          </Button>
        </Jumbotron>
        {this.state.showTodayTraining ? <NewTraining /> : null}
      </section>
    );
  }
}
