import React, { Component } from "react";
import "./newProduct.scss";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
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
    numberProduct: 0,
    showProductsList: false,
    completeName: ""
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
    this.setState({
      newProductName: "",
      numberOfProteins: 0,
      numberOfCarbohydrates: 0,
      numberOfFats: 0,
      numberOfCalories: 0,
      weight: 0
    });
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

  handleProductName = e => {
    this.handleTextInputChange(e);
    this.searchProductName(e);
  };

  searchProductName = async e => {
    const name = e.target.value;
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-app-id": "771915a1",
      "x-app-key": "1b4374178aef5f8000676113d72ba037"
    };
    try {
      let response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${name}`,
        {
          method: "get",
          headers: requestHeaders
        }
      );
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showProductsList: true });
      const productList = [];
      let numberProduct = 0;
      response.common.forEach(el => {
        if (numberProduct >= 12) return;
        numberProduct += 1;
        productList.push(el.food_name);
      });
      console.log(productList);
      this.setState({ productsArray: productList });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  searchProductDetails = async e => {
    e.preventDefault();

    const productName = e.currentTarget.innerText;

    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-app-id": "771915a1",
      "x-app-key": "1b4374178aef5f8000676113d72ba037"
    };
    const requestBody = {
      query: `100g ${productName}`
    };
    try {
      let response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "post",
          headers: requestHeaders,
          body: JSON.stringify(requestBody)
        }
      );
      if (response.status !== 200) throw response;
      response = await response.json();
      const foods = response.foods[0];

      this.setState({
        newProductName: productName,
        showProductsList: false,
        numberOfProteins: foods.nf_protein,
        numberOfCarbohydrates: foods.nf_total_carbohydrate,
        numberOfFats: foods.nf_total_fat,
        numberOfCalories: foods.nf_calories
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  renderListElements = el => {
    return (
      <ListGroup.Item
        action
        className="newProduct__productElement"
        onClick={this.searchProductDetails}
      >
        {el}
      </ListGroup.Item>
    );
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
                onChange={this.handleProductName}
                type="text"
                placeholder="Wpisz nazwę"
                value={this.state.newProductName}
              />
            </Form.Group>
            {this.state.showProductsList ? (
              <ListGroup className="newProduct__productList">
                {this.state.productsArray
                  ? this.state.productsArray.map(this.renderListElements)
                  : null}
              </ListGroup>
            ) : null}

            <Form.Label className="makroelementsIn100g">
              Zawartość makroskładników w 100 g.
            </Form.Label>
            <Form.Group controlId="numberOfProteins">
              <Form.Label>Białko:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
                value={this.state.numberOfProteins}
              />
            </Form.Group>
            <Form.Group controlId="numberOfCarbohydrates">
              <Form.Label>Węglowodany:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
                value={this.state.numberOfCarbohydrates}
              />
            </Form.Group>
            <Form.Group controlId="numberOfFats">
              <Form.Label>Tłuszcze:</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
                value={this.state.numberOfFats}
              />
            </Form.Group>
            <Form.Group controlId="numberOfCalories">
              <Form.Label>Kaloryczność</Form.Label>
              <Form.Control
                onChange={this.handleNumberInputChange}
                type="number"
                value={this.state.numberOfCalories}
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
