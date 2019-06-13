import React, { Component } from "react";
import "./editPlan.scss";
import { Tab, Row, Col, ListGroup, Table } from "react-bootstrap";

export default class myPlans extends Component {
  renderTitle = el => {
    return (
      <ListGroup key={el.id}>
        <ListGroup.Item action href={el.id}>
          {el.name}
        </ListGroup.Item>
      </ListGroup>
    );
  };

  renderPlans = el => {
    return (
      <div key={el.id}>
        <Tab.Pane eventKey={el.id}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td>Nazwa</td>
                <td>Liczba serii</td>
              </tr>
            </thead>
            <tbody>{el.exercises.map(this.renderExercises)}</tbody>
          </Table>
        </Tab.Pane>
      </div>
    );
  };

  renderExercises = el => {
    return (
      <tr key={el.name}>
        <td>{el.name}</td>
        <td>{el.series}</td>
      </tr>
    );
  };

  showInput = () => {};

  render() {
    return (
      <div>
        <h1>Twoje plany treningowe</h1>
        <Tab.Container>
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item disabled href="#link">
                  Wybierz trening
                </ListGroup.Item>
              </ListGroup>
              {this.props.plans ? this.props.plans.map(this.renderTitle) : null}
            </Col>
            <Col>
              <Tab.Content>
                {this.props.plans
                  ? this.props.plans.map(this.renderPlans)
                  : null}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
