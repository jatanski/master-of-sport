import React, { Component } from "react";
import "./statistics.scss";
import { Button, Jumbotron } from "react-bootstrap";
import BmiStatistics from "../../components/BmiStatistics/BmiStatistics";
import CircuitsStatistics from "../../components/CircuitsStatistics/CircuitsStatistics";
import MenusStatistics from "../../components/MenusStatistics/MenusStatistics";
import WorkoutsStatistics from "../../components/WorkoutsStatistics/WorkoutsStatistics";

export default class Statistics extends Component {
  state = {
    showBmi: false,
    showCircuits: false,
    showMenus: false,
    showWorkouts: false
  };

  showBmiTable = () => {
    this.setState({
      showBmi: true,
      showCircuits: false,
      showMenus: false,
      showWorkouts: false
    });
  };
  showCircuitsTable = () => {
    this.setState({
      showBmi: false,
      showCircuits: true,
      showMenus: false,
      showWorkouts: false
    });
  };

  showMenus = () => {
    this.setState({
      showBmi: false,
      showCircuits: false,
      showMenus: true,
      showWorkouts: false
    });
  };

  showWorkouts = () => {
    this.setState({
      showBmi: false,
      showCircuits: false,
      showMenus: false,
      showWorkouts: true
    });
  };

  render() {
    return (
      <section className="statistics">
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">Statystyki</h2>
            <p>
              W tej sekcji możesz przejrzeć swoje statystyki. Wybierz sekcję,
              która Cię interesuje.
            </p>
          </div>
          <div className="statistics__buttons">
            <Button onClick={this.showBmiTable} size="lg" variant="success">
              BMI
            </Button>
            <Button
              onClick={this.showCircuitsTable}
              size="lg"
              variant="success"
            >
              Obwody i waga
            </Button>
            <Button onClick={this.showMenus} size="lg" variant="success">
              Jadłospisy
            </Button>
            <Button onClick={this.showWorkouts} size="lg" variant="success">
              Treningi
            </Button>
          </div>
        </Jumbotron>

        {this.state.showBmi ? <BmiStatistics /> : null}
        {this.state.showCircuits ? <CircuitsStatistics /> : null}
        {this.state.showMenus ? <MenusStatistics /> : null}
        {this.state.showWorkouts ? <WorkoutsStatistics /> : null}
      </section>
    );
  }
}
