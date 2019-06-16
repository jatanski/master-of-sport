import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import NewPlanForm from "../../components/NewPlanForm/NewPlanForm";
import "./workoutPlans.scss";

export default class WorkoutPlans extends Component {
  state = {
    showNewTrainingPlan: false,
    disableTrainingPlan: false
  };

  showNewTrainingPlan = () => this.setState({ showNewTrainingPlan: true });
  showOffNewPlan = () => this.setState({ showNewTrainingPlan: false });

  render() {
    return (
      <section className="workoutplans">
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">
              Dodaj nowy plan treningowy
            </h2>
            <p>
              Możesz tutaj dodać nowy plan treningowy, którego potem można użyć
              przy zapisie swoich treningów
            </p>
            <h3 className="calculatorCalories__header-secondary">Instrukcja</h3>
            <p className="calculatorCalories__description">
              1. Wpisz przycisk <span className="bold"> Stwórz plan</span> i
              wpisz nazwę planu. <br /> 2. Za pomocą przycisku dodaj nowe
              ćwiczenie. <br /> 3. Wpisz nazwę ćwiczenia i ilość serii. <br />
              4. Gdy już dodasz wszystkie ćwiczenia kliknij{" "}
              <span className="bold">Zapisz plan</span>
              . <br /> 5. Zapisane plany możesz znaleźć w zakładce plany
              treningowe.
            </p>
          </div>
          <Button
            onClick={this.showNewTrainingPlan}
            size="lg"
            variant="primary"
            disabled={this.state.disableTrainingPlan}
          >
            Stwórz plan treningowy
          </Button>
        </Jumbotron>
        {this.state.showNewTrainingPlan ? (
          <NewPlanForm showOff={this.showOffNewPlan} />
        ) : null}
      </section>
    );
  }
}
