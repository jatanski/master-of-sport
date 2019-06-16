import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./summaryTable.scss";
import { connect } from "react-redux";

class SummaryTable extends Component {
  state = {
    meals: []
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
        <thead>
          <tr>
            <td />
            <td>Kalorie</td>
            <td>Białko</td>
            <td>Węglowodany</td>
            <td>Tłuszcze</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="summaryDay">Suma dobowa</td>
            <td>{this.props.elementsFromAllMeals.calories} kcal</td>
            <td>{this.props.elementsFromAllMeals.proteins} g</td>
            <td>{this.props.elementsFromAllMeals.carbohydrates} g</td>
            <td>{this.props.elementsFromAllMeals.fats} g</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  elementsFromAllMeals: state.sumMeals
});

export default connect(
  mapStateToProps,
  {}
)(SummaryTable);
