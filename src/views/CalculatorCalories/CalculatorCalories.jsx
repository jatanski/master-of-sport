import React, { Component } from "react";
import "./calculatorCalories.scss";
import { Button } from "react-bootstrap";
import SummaryTable from "../../components/SumarryTable/SummaryTable";
import Meal from "../../components/Meal/Meal";
import { allActions } from "../../redux/store";

export default class CalculatorCalories extends Component {
  state = {
    disabledButtonNewMeal: false,
    numberOfMeals: 0,
    meals: []
  };
  addNewMeal = () => {
    this.setState({
      disabledButtonNewMeal: true,
      numberOfMeals: this.state.numberOfMeals + 1,
      meals: [...this.state.meals, { number: this.state.numberOfMeals }]
    });
  };

  disabledOff = () => {
    this.setState({ disabledButtonNewMeal: false });
  };

  createNewMeal = el => {
    allActions.addMeal();
    return (
      <li className="mealList-el" key={el.number}>
        <Meal disabledOff={this.disabledOff} number={el.number + 1} />
      </li>
    );
  };

  render() {
    return (
      <section className="calculatorCalories">
        <br />
        <br />
        <SummaryTable />
        <br />
        <br />
        <Button
          onClick={this.addNewMeal}
          variant="primary"
          disabled={this.state.disabledButtonNewMeal}
        >
          {" "}
          Dodaj posiłek
        </Button>
        <ul className="mealList">
          {this.state.meals ? this.state.meals.map(this.createNewMeal) : null}
        </ul>
      </section>
    );
  }
}
