import React, { Component } from "react";
import "./calculatorCalories.scss";
import { Button, InputGroup, FormControl, Jumbotron } from "react-bootstrap";
import SummaryTable from "../../components/SumarryTable/SummaryTable";
import Meal from "../../components/Meal/Meal";
import CustomAlert from "../../components/Alert/Alert";
import { allActions } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faSave } from "@fortawesome/free-solid-svg-icons";

export default class CalculatorCalories extends Component {
  state = {
    disabledButtonNewMeal: true,
    disabledButtonSavePlan: true,
    disabledButtonStart: false,
    numberOfMeals: 0,
    meals: [],
    name: "",
    showDisabledLayer: false,
    showSavePlan: false,
    showSuccessPopUp: false,
    showFalsePopUp: false,
    showSection: false
  };

  alertText = {
    success: {
      header: "Plan został zapisany.",
      desc:
        "Jeżeli chesz przejrzeć wszystkie swoje plany, znajdziesz je w zakładce MOJE PLANY. Natomiast w zakładce DZIENNIK DZIETETYCZNY możesz dodać swoje dzisiejsze posiłki."
    },
    fail: {
      header: "Plan o tej nazwie już istnieje.",
      desc: "Wpisz inną nazwę."
    },
    goTo1: {
      text: "Moje plany",
      link: "/myPlans"
    },
    goTo2: {
      text: "Dziennik dietetyczny",
      link: "/dupa"
    }
  };

  addNewMeal = () => {
    this.setState({
      disabledButtonNewMeal: true,
      disabledButtonSavePlan: true,
      numberOfMeals: this.state.numberOfMeals + 1,
      meals: [...this.state.meals, { number: this.state.numberOfMeals }],
      showSavePlan: true
    });
  };

  cleanCalc = () => {
    this.setState({
      disabledButtonNewMeal: true,
      disabledButtonSavePlan: true,
      disabledButtonStart: false,
      numberOfMeals: 0,
      meals: [],
      name: "",
      showDisabledLayer: false,
      showSavePlan: false,
      showSuccessPopUp: false,
      showFalsePopUp: false,
      showSection: false
    });
    allActions.resetNewMeal();
    allActions.resetMeals();
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });

  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  collectName = e => {
    const name = e.target.value;
    this.setState({ name: name });
  };

  createNewMeal = el => {
    allActions.addMeal();
    return (
      <li className="mealList-el" key={el.number}>
        <Meal
          disabledOffSavePlan={this.disabledOffSavePlan}
          disabledOff={this.disabledOff}
          number={el.number + 1}
        />
      </li>
    );
  };

  disabledOffSavePlan = () =>
    this.setState({
      disabledButtonSavePlan: false
    });

  disabledOff = () =>
    this.setState({
      disabledButtonNewMeal: false
    });

  savePlan = async () => {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      name: this.state.name,
      meals: window.store.getState().mealNew.meals,
      summary: window.store.getState().sumMeals
    };
    try {
      let response = await fetch("/nutritionalPlans", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showSuccessPopUp: true, showDisabledLayer: true });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  showDisabledLayer = () => this.setState({ showDisabledLayer: true });
  showOffDisabledLayer = () => this.setState({ showDisabledLayer: false });

  showSection = () =>
    this.setState({
      showSection: true,
      disabledButtonStart: true,
      disabledButtonNewMeal: false
    });

  render() {
    return (
      <section className="calculatorCalories">
        {this.state.showDisabledLayer ? (
          <div className="disabledLayer" />
        ) : null}
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">
              Dodaj nowy plan żywieniowy
            </h2>
            <p>
              Możesz tutaj dodać nowy plan dietetyczny, którego potem można użyć
              przy tworzeniu jadłospisów na dany dzień.
            </p>
            <h3 className="calculatorCalories__header-secondary">Instrukcja</h3>
            <p className="calculatorCalories__description">
              1. Wpisz nazwę planu, a następnie kliknij rozpocznij. <br /> 2.
              Kliknij "Dodaj posiłek", a następnie do każdego posiłku dodaj
              produkty. <br /> 3. Po dodaniu wszystkich produktów zapisz plan.
              Zapisane plany możesz znaleźć w zakładce plany dietetyczne.
            </p>
          </div>
          <InputGroup size="lg" className="calculatorCalories__formName">
            <InputGroup.Prepend>
              <InputGroup.Text className="calculatorCalories__formName__label">
                Wpisz nazwę planu
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              disabled={this.state.disabledButtonStart}
              onChange={this.collectName}
              value={this.state.name}
            />
            <Button
              className="calculatorCalories__formName__button"
              disabled={this.state.disabledButtonStart}
              onClick={this.showSection}
            >
              Rozpocznij
            </Button>
          </InputGroup>
        </Jumbotron>
        <SummaryTable />
        <Button
          onClick={this.addNewMeal}
          variant="primary"
          disabled={this.state.disabledButtonNewMeal}
          className="calculatorCalories__newMeal"
          size="lg"
        >
          <span className="calculatorCalories__newMeal__text">
            Nowy posiłek
          </span>
          <FontAwesomeIcon icon={faUtensils} />
        </Button>
        {this.state.showSection ? (
          <div className="calculatorCalories__meals">
            <ul className="mealList">
              {this.state.meals
                ? this.state.meals.map(this.createNewMeal)
                : null}
            </ul>
            {this.state.showSavePlan ? (
              <Button
                disabled={this.state.disabledButtonSavePlan}
                onClick={this.savePlan}
                variant="primary"
                size="lg"
                className="calculatorCalories__newMeal"
              >
                <span className="calculatorCalories__newMeal__text">
                  Zapisz plan
                </span>
                <FontAwesomeIcon icon={faSave} />
              </Button>
            ) : null}
            {this.state.showSuccessPopUp ? (
              <CustomAlert
                header={this.alertText.success.header}
                desc={this.alertText.success.desc}
                close={this.closeSuccessPopUp}
                goTo1Text={this.alertText.goTo1.text}
                goTo1Link={this.alertText.goTo1.link}
                goTo2Text={this.alertText.goTo2.text}
                goTo2Link={this.alertText.goTo2.link}
                extraFunc={this.cleanCalc}
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
        ) : null}
      </section>
    );
  }
}
