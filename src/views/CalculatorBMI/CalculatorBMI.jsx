import React, { Component } from "react";
import "./calculatorBMI.scss";
import { Form, Button } from "react-bootstrap";

export default class CalculatorBMI extends Component {
  render() {
    return (
      <section className="calculatorBMI">
        <h1>Oblicz swoje BMI</h1>
        <Form>
          <Form.Group controlId="gender">
            <Form.Label>Wybierz płeć</Form.Label>
            <Form.Check
              custom
              type="radio"
              name="gender"
              label="Kobieta"
              id="radioWoman"
            />
            <Form.Check
              custom
              type="radio"
              name="gender"
              label="Mężczyzna"
              id="radioMan"
            />
          </Form.Group>
          <Form.Group controlId="weight">
            <Form.Label>Waga w kg</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group controlId="height">
            <Form.Label>Wzrost w cm</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Button>Oblicz</Button>
        </Form>
      </section>
    );
  }
}
