import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export default class NewPlanForm extends Component {
  state = {
    numberOfExercises: 1,
    exercises: []
  };

  addNewExercises = () => {
    this.setState({
      numberOfExercises: this.state.numberOfExercises + 1,
      exercises: [
        ...this.state.exercises,
        { number: this.state.numberOfExercises + 1 }
      ]
    });
  };

  savePlan = () => {};

  showExercises = el => {
    return (
      <Form.Group key={el.number} controlId={el.number}>
        <Row>
          <Col>
            <Form.Label>Ćwiczenie {el.number} </Form.Label>
            <Form.Control />
          </Col>
          <Col>
            <Form.Label>Liczba serii: </Form.Label>
            <Form.Control type="number" />
          </Col>
        </Row>
      </Form.Group>
    );
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="nameOfTraining">
          <Form.Label>Wpisz nazwę treningu</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Label>Wpisz nazwy ćwiczeń: </Form.Label>
        <Form.Group controlId="nameOfExercises">
          <Row>
            <Col>
              <Form.Label>Ćwiczenie 1 </Form.Label>
              <Form.Control />
            </Col>
            <Col>
              <Form.Label>Liczba serii </Form.Label>
              <Form.Control type="number" />
            </Col>
          </Row>
        </Form.Group>
        {this.state.exercises
          ? this.state.exercises.map(this.showExercises)
          : null}
        <Button variant="primary" onClick={this.addNewExercises}>
          +
        </Button>
        <br />
        <br />
        <Button variant="success" onClick={this.savePlan}>
          Zapisz plan
        </Button>
      </Form>
    );
  }
}
