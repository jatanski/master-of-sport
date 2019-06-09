import React, { Component } from "react";
import "./calculatorBMI.scss";
import { Form, Button } from "react-bootstrap";
import BmiTable from "../../components/BmiTable/BmiTable";

export default class CalculatorBMI extends Component {
  state = {
    weight: 0,
    height: 0,
    resultDisplay: "block",
    bmi: 0,
    id: ""
  };

  resultStyle = {
    display: this.state.resultDisplay
  };

  showResult = () => {
    this.setState({ resultDisplay: "block" });
  };

  collectData = e => {
    const state = {};
    state[`${e.target.id}`] = Number(e.target.value);
    this.setState(state);
  };

  countBMI = () => {
    let bmi = this.state.weight / Math.pow(this.state.height / 100, 2);
    bmi = Math.round(bmi * 10) / 10;
    this.setState({ bmi: bmi });
    this.showResult();

    let id = "";
    if (bmi < 16) id = "1";
    else if (bmi >= 16 && bmi < 17) id = "2";
    else if (bmi >= 17 && bmi < 18.5) id = "3";
    else if (bmi >= 18.5 && bmi < 25.5) id = "4";
    else if (bmi >= 25 && bmi < 30) id = "5";
    else if (bmi >= 30 && bmi < 35) id = "6";
    else if (bmi >= 35 && bmi < 40) id = "7";
    else if (bmi > 40) id = "8";
    console.log(id);
    this.setState({ id: id });
  };

  saveBMI = () => {};

  renderResult = () => {
    return (
      <div style={this.resultStyle}>Twoje BMI wynosi: {this.state.bmi}.</div>
    );
  };

  renderDescription = () => {
    if (this.state.id >= 1 && this.state.id <= 3) {
      return <p>Twoja waga jest za niska! Musisz przytyć.</p>;
    } else if (this.state.id == 4) {
      return <p>Twoja waga jest prawidłowa. Gratuluję!</p>;
    } else if (this.state.id >= 5) {
      return <p>Jesteś grubasem! Musisz koniecznie schudnąć albo umrzesz.</p>;
    }
  };

  render() {
    return (
      <section className="calculatorBMI">
        <h1 className="calculatorBMI__header">Oblicz swoje BMI</h1>
        <Form className="calculatorBMI__form">
          <Form.Group controlId="weight">
            <Form.Label className="calculatorBMI__form__label">
              Waga w kg:
            </Form.Label>
            <Form.Control
              className="calculatorBMI__form__input"
              type="number"
              onChange={this.collectData}
            />
          </Form.Group>
          <Form.Group controlId="height">
            <Form.Label className="calculatorBMI__form__label">
              Wzrost w cm:
            </Form.Label>
            <Form.Control
              className="calculatorBMI__form__input"
              type="number"
              onChange={this.collectData}
            />
          </Form.Group>
          <Button
            className="calculatorBMI__form__button"
            variant="primary"
            onClick={this.countBMI}
          >
            Oblicz
          </Button>
        </Form>
        {this.renderResult()}
        <br />
        <BmiTable id={this.state.id} />
        <br />
        <Button onClick={this.saveBMI} variant="success">
          Zapisz wynik
        </Button>
        {this.renderDescription()}
      </section>
    );
  }
}
