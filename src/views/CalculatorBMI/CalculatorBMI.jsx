/* eslint-disable eqeqeq */
import React, { Component } from "react";
import "./calculatorBMI.scss";
import {
  Form,
  Button,
  Jumbotron,
  InputGroup,
  FormControl
} from "react-bootstrap";
import BmiTable from "../../components/BmiTable/BmiTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../../components/Alert/Alert";

export default class CalculatorBMI extends Component {
  state = {
    bmi: 0,
    height: 0,
    id: "",
    resultDisplay: "block",
    showSuccessPopUp: false,
    showFalsePopUp: false,
    weight: 0
  };

  resultStyle = {
    display: this.state.resultDisplay
  };

  alertText = {
    success: {
      header: "Wynik został zapisany.",
      desc:
        "Jeżeli chesz przejrzeć wszystkie swoje wyniki, znajdziesz je w STATYSTYKACH."
    },
    fail: {
      header: "BMI zostało już dzisiaj dodane.",
      desc: "Spróbuj ponownie jutro."
    },
    goTo1: {
      text: "Statystyki",
      link: "/statistics"
    }
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

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
    this.setState({ id: id });
  };

  saveBMI = async () => {
    let category = "";
    if (this.state.id === "1") category = "Wygłodzenie";
    else if (this.state.id === "2") category = "Wychudzenie";
    else if (this.state.id === "3") category = "Niedowaga";
    else if (this.state.id === "4") category = "Wartość prawidłowa";
    else if (this.state.id === "5") category = "Nadwaga";
    else if (this.state.id === "6") category = "I stopień otyłości";
    else if (this.state.id === "7") category = "II stopień otyłości";
    else if (this.state.id === "8") category = "III stopień otyłości";

    const token = localStorage.getItem("x-auth-token");
    const now = `${new Date().getDate()}.${new Date().getMonth() +
      1}.${new Date().getFullYear()}`;
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      value: this.state.bmi,
      date: now,
      category: category
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
      this.setState({ showSuccessPopUp: true });
    } catch (error) {
      console.log(error);
    }
  };

  showResult = () => {
    this.setState({ resultDisplay: "block" });
  };

  renderResult = () => {
    return (
      <div className="bmiResult" style={this.resultStyle}>
        Twoje BMI wynosi: {this.state.bmi}.
      </div>
    );
  };

  renderDescription = () => {
    if (this.state.id >= 1 && this.state.id <= 3) {
      return (
        <p className="resultDescription">
          Twoja waga jest za niska! Musisz przytyć.
        </p>
      );
    } else if (this.state.id == 4) {
      return (
        <p className="resultDescription">
          Twoja waga jest prawidłowa. Gratuluję!
        </p>
      );
    } else if (this.state.id >= 5) {
      return (
        <p className="resultDescription">
          Jesteś grubasem! Musisz koniecznie schudnąć albo umrzesz.
        </p>
      );
    }
  };

  render() {
    return (
      <section className="calculatorBMI">
        <div className="calculatorBMI__wrap">
          <Jumbotron className="jumbotron-bmi">
            <div className="calculatorCalories__instruction">
              <h2 className="calculatorCalories__header-main">
                Oblicz swoje BMI
              </h2>
              <p>
                BMI to ważny wyznacznik tego, czy Twoje waga jest prawidłowa.
                Nie lekceważ odchyleń od stanu prawidłowego, ponieważ mogą być
                one groźne dla Twojego zdrowia.
              </p>
              <h3 className="calculatorCalories__header-secondary">
                Instrukcja
              </h3>
              <p className="calculatorCalories__description">
                1. Wpisz swoją wagę oraz wzrost w centumetrach, a następnie
                kliknij oblicz. <br /> 2. Kalkulator obliczy swoje BMI oraz
                sprawdzi w jakiej kategorii się znajdujesz. <br /> 3. Możesz
                zapisać swoje BMI, aby móc monitorować swoje zmiany.
              </p>
            </div>
            <Form className="calculatorBMI__form">
              <InputGroup className="calculatorBMI__form__inputGroup" size="lg">
                <InputGroup.Prepend>
                  <InputGroup.Text>Waga w kg</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="calculatorBMI__form__input"
                  type="number"
                  onChange={this.collectData}
                  id="weight"
                />
              </InputGroup>
              <InputGroup className="calculatorBMI__form__inputGroup" size="lg">
                <InputGroup.Prepend>
                  <InputGroup.Text>Wzrost w cm</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="calculatorBMI__form__input"
                  type="number"
                  onChange={this.collectData}
                  id="height"
                />
              </InputGroup>
              <Button
                className="calculatorBMI__form__button"
                variant="primary"
                onClick={this.countBMI}
              >
                Oblicz
              </Button>
            </Form>
            {this.renderResult()}
          </Jumbotron>
          <BmiTable className="bmi" id={this.state.id} />
          <div className="calculatorBMI__button">
            {this.state.bmi !== 0 ? (
              <Button
                className="calculatorCalories__newMeal"
                size="lg"
                onClick={this.saveBMI}
                variant="success"
              >
                <span className="calculatorCalories__newMeal__text">
                  Zapisz wynik
                </span>
                <FontAwesomeIcon icon={faSave} />
              </Button>
            ) : null}
            {this.renderDescription()}
          </div>
          {this.state.showSuccessPopUp ? (
            <CustomAlert
              header={this.alertText.success.header}
              desc={this.alertText.success.desc}
              close={this.closeSuccessPopUp}
              goTo1Text={this.alertText.goTo1.text}
              goTo1Link={this.alertText.goTo1.link}
            />
          ) : null}
          {this.state.showFalsePopUp ? (
            <CustomAlert
              header={this.alertText.fail.header}
              desc={this.alertText.fail.desc}
              close={this.closeFalsePopUp}
            />
          ) : null}
        </div>
      </section>
    );
  }
}
