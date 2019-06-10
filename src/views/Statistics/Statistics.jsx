import React, { Component } from "react";
import "./statistics.scss";
import { Button } from "react-bootstrap";
import BmiStatistics from "../../components/BmiStatistics/BmiStatistics";

export default class Statistics extends Component {
  state = {
    showBmi: false,
    showCircuits: false
  };
  showBmiTable = () => {
    this.setState({ showBmi: true });
  };
  showCircuitsTable = () => {};

  render() {
    return (
      <section className="statistics">
        <Button onClick={this.showBmiTable} size="lg" variant="primary">
          BMI
        </Button>
        <Button onClick={this.showCircuitsTable} size="lg" variant="primary">
          Obwody i waga
        </Button>
        {this.state.showBmi ? <BmiStatistics /> : null}
      </section>
    );
  }
}
