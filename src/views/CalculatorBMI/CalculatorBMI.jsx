import React, { Component } from "react";
import "./calculatorBMI.scss";
import { Form, Button, Alert } from "react-bootstrap";
import BmiTable from "../../components/BmiTable/BmiTable";
import { Link } from "react-router-dom";

export default class CalculatorBMI extends Component {
  state = {
    weight: 0,
    height: 0,
    resultDisplay: "block",
    bmi: 0,
    id: "",
    showPopUp: false,
    showFalsePopUp: false
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

  saveBMI = async () => {
    const token = localStorage.getItem("x-auth-token");
    const now = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`;
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      value: this.state.bmi,
      date: now
    };

    try {
      let response = await fetch("/bmi", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showPopUp: true });
    } catch (error) {
      console.log(error);
    }
  };

  closePopUp = () => this.setState({ showPopUp: false });

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });

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
        {this.state.bmi !== 0 ? (
          <Button onClick={this.saveBMI} variant="success">
            Zapisz wynik
          </Button>
        ) : null}
        {this.renderDescription()}
        {this.state.showPopUp ? (
          <Alert
            className="calculatorBMI__popUp"
            show={this.state.showPopUp}
            variant="success"
          >
            <Alert.Heading>Twoje BMI zostało zapisane.</Alert.Heading>
            <hr />
            <p>
              Możesz teraz przejrzeć swoje statystyki. Albo zrobić coś innego.
              Wybór należy do Ciebie.
            </p>
            <div className="d-flex justify-content-start">
              <Link to="/statistics">
                <Button variant="outline-secondary">
                  Przejdź do statystyk
                </Button>
              </Link>
            </div>
            <div className="d-flex justify-content-end">
              <Button onClick={this.closePopUp} variant="outline-success">
                Zamknij
              </Button>
            </div>
          </Alert>
        ) : null}

        <Alert
          className="calculatorBMI__popUp"
          show={this.state.showFalsePopUp}
          variant="danger"
        >
          <Alert.Heading>Dodałeś już dzisiaj swoje BMI.</Alert.Heading>
          <br />
          <p>Spróbuj ponownie jutro.</p>
          <hr />

          <div className="d-flex justify-content-end">
            <Button onClick={this.closeFalsePopUp} variant="outline-danger">
              Zamknij
            </Button>
          </div>
        </Alert>
      </section>
    );
  }
}
