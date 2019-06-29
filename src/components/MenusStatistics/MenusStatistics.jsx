import React, { Component } from "react";
import { Tab, Nav, Col, Row, Table } from "react-bootstrap";

export default class WorkoutsStatistics extends Component {
  state = {
    menus: []
  };

  numberOfMeal = 0;
  async componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/menus", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ menus: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  renderNav = el => {
    return (
      <Nav.Item key={el._id}>
        <Nav.Link eventKey={el.date}>{el.date}</Nav.Link>
      </Nav.Item>
    );
  };

  renderPane = el => {
    return (
      <Tab.Pane key={el._id} eventKey={el.date}>
        {el.meals.map(this.renderMeal)}
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
              <td>{el.summary.calories} kcal</td>
              <td>{el.summary.proteins} g</td>
              <td>{el.summary.carbohydrates} g</td>
              <td>{el.summary.fats} g</td>
            </tr>
          </tbody>
        </Table>
      </Tab.Pane>
    );
  };

  renderProduct = el => {
    return (
      <tr key={el.numberProduct}>
        <td> {el.newProductName}</td>
        <td>{el.weight} g</td>
        <td>{el.numberOfCalories} kcal</td>
        <td>{el.numberOfProteins} g</td>
        <td>{el.numberOfCarbohydrates} g</td>
        <td>{el.numberOfFats} g</td>
      </tr>
    );
  };

  renderMeal = el => {
    this.numberOfMeal += 1;
    return (
      <div key={Math.random()} className="meal">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan="6">
                <span className="numberOfMeal">
                  Posiłek {this.state.numberOfMeal}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produkt</td>
              <td>Ilość</td>
              <td>Kcal</td>
              <td>Białko</td>
              <td>Węglowodany</td>
              <td>Tłuszcze</td>
            </tr>
            {el.products.map(this.renderProduct)}
            <tr>
              <td />
              <td />
              <td>{el.summary.calories} kcal</td>
              <td>{el.summary.proteins} g</td>
              <td>{el.summary.carbohydrates} g</td>
              <td>{el.summary.fats} g</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  render() {
    console.log(this.state);
    return (
      <section className="statistics__menus">
        <Tab.Container id="tab" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {this.state.menus ? this.state.menus.map(this.renderNav) : null}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {this.state.menus
                  ? this.state.menus.map(this.renderPane)
                  : null}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
    );
  }
}
