import React, { Component } from "react";
import "./newProduct.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { allActions } from "../../redux/store";

export default class NewProduct extends Component {
  state = {
    newProductName: "",
    numberOfProteins: 0,
    numberOfCarbohydrates: 0,
    numberOfFats: 0,
    numberOfCalories: 0,
    weight: 0
  };
  handleNumberInputChange = e => {
    const state = {};
    state[`${e.target.id}`] = Number(e.target.value);
    this.setState(state);
  };

  handleTextInputChange = e => {
    const state = {};
    state[`${e.target.id}`] = e.target.value;
    this.setState(state);
  };

  createNewProduct = () => {
    allActions.sendInfo(this.state);
    this.props.addNewProduct();
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Nowy produkt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newProductName">
              <Form.Label>Nazwa produktu</Form.Label>
              <Form.Control
                onChange={this.handleTextInputChange}
                type="text"
                placeholder="Wpisz nazwę"
              />
            </Form.Group>
            <Form.Label>Zawartość makroskładników w 100G</Form.Label>
            <br />
            <br />
            <Form.Group controlId="numberOfProteins">
              <Form.Label>Białko:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="numberOfCarbohydrates">
              <Form.Label>Węglowodany:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="numberOfFats">
              <Form.Label>Tłuszcze:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="numberOfCalories">
              <Form.Label>Kaloryczność w 100G</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Waga:</Form.Label>
              <Form.Control
                type="number"
                onChange={this.handleNumberInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close} variant="secondary">
            Close
          </Button>
          <Button onClick={this.createNewProduct} variant="primary">
            Dodaj produkt
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
