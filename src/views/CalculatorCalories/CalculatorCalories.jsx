import React, { Component } from "react";
import "./calculatorCalories.scss";
import { Button } from "react-bootstrap";
import SummaryTable from "../../components/SumarryTable/SummaryTable";
import Meal from "../../components/Meal/Meal";

export default class CalculatorCalories extends Component {
  state = {
    numberOfMeals: 0,
    meals: []
  };
  addNewMeal = () => {
    this.setState({
      numberOfMeals: this.state.numberOfMeals + 1,
      meals: [...this.state.meals, { number: this.state.numberOfMeals }]
    });
  };

  createNewMeal = el => {
    return (
      <li className="mealList-el" key={el.number}>
        <Meal number={el.number + 1} />
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
        <Button onClick={this.addNewMeal} variant="primary">
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
