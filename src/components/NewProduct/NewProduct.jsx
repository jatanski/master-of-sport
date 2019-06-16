import React, { Component } from "react";
import "./newProduct.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { allActions } from "../../redux/store";

export default class NewProduct extends Component {
  state = {
    multipier: 0,
    newProductName: "",
    numberOfProteins: 0,
    numberOfCarbohydrates: 0,
    numberOfFats: 0,
    numberOfCalories: 0,
    weight: 0,
    numberProduct: 0
  };

  countElements = () => {
    const multipier = this.state.weight / 100;
    const elementsAfterCount = {
      newProductName: this.state.newProductName,
      numberOfProteins: this.state.numberOfProteins * multipier,
      numberOfCarbohydrates: this.state.numberOfCarbohydrates * multipier,
      numberOfFats: this.state.numberOfFats * multipier,
      numberOfCalories: this.state.numberOfCalories * multipier,
      weight: this.state.weight,
      numberProduct: this.state.numberProduct + 1
    };
    this.setState({
      multipier: multipier,
      numberProduct: elementsAfterCount.numberProduct,
      numberOfProteins: elementsAfterCount.numberOfProteins,
      numberOfCarbohydrates: elementsAfterCount.numberOfCarbohydrates,
      numberOfFats: elementsAfterCount.numberOfFats,
      numberOfCalories: elementsAfterCount.numberOfCalories
    });
    allActions.sendInfo(elementsAfterCount);
  };

  createNewProduct = () => {
    this.countElements();
    allActions.addProduct(window.store.getState().newProduct.info);

    const allProducts = window.store.getState().allProducts.products;
    allActions.sumProducts(allProducts[allProducts.length - 1]);
    allActions.addNewProduct(window.store.getState().newProduct.info);
    this.props.addNewProduct();
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

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Nowy produkt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newProductName">
              <Form.Label>Nazwa produktu:</Form.Label>
              <Form.Control
                onChange={this.handleTextInputChange}
                type="text"
                placeholder="Wpisz nazwę"
              />
            </Form.Group>
            <Form.Label className="makroelementsIn100g">
              Zawartość makroskładników w 100 g.
            </Form.Label>
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
              <Form.Label>Kaloryczność</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label className="makroelementsIn100g">Waga:</Form.Label>
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
