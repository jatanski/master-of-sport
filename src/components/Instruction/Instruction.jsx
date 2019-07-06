import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Instruction extends Component {
  render() {
    return (
      <section className="instruction">
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">
              {this.props.header}
            </h2>
            <p className="calculatorCalories__prop">{this.props.description}</p>
            <h3 className="calculatorCalories__header-secondary">Instrukcja</h3>
            <p className="calculatorCalories__description">
              {this.props.instruction()}
            </p>
          </div>
        </Jumbotron>
      </section>
    );
  }
}
