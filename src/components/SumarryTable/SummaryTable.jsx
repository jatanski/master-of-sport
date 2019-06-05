import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./summaryTable.scss";
import { connect } from "react-redux";

class SummaryTable extends Component {
  state = {
    meals: [],
    elementsFromAllMeals: {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0
    }
  };

  sumAllMeals = () => {
    const meals = {};

    this.state.meals.forEach(el => {
      meals.calories += el.calories;
      meals.proteins += el.proteins;
      meals.carbohydrates += el.carbohydrates;
      meals.fats = el.fats;
    });

    this.setState({ elementsFromAllMeals: meals });
  };

  render() {
    return (
      <Table
        className="caloriesSummaryTable"
        striped
        bordered
        hover
        variant="dark"
      >
        <tbody>
          <tr>
            <td />
            <td>Kalorie</td>
            <td>Białko</td>
            <td>Węglowodany</td>
            <td>Tłuszcze</td>
          </tr>
          <tr>
            <td>Suma dobowa</td>
            <td>{this.state.elementsFromAllMeals.calories} kcal</td>
            <td>{this.state.elementsFromAllMeals.proteins} g</td>
            <td>{this.state.elementsFromAllMeals.carbohydrates} g</td>
            <td>{this.state.elementsFromAllMeals.fats} g</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  elementsFromAllMeals: ""
});

export default connect(
  mapStateToProps,
  {}
)(SummaryTable);
