import React, { Component } from "react";
import "./newProduct.scss";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { allActions } from "../../redux/store";

export default class NewProduct extends Component {
  state = {
    multipier: 0,
    newProductName: "",
    numberProduct: 0,
    numberOfProteins: 0,
    numberOfCarbohydrates: 0,
    numberOfFats: 0,
    numberOfCalories: 0,
    showProductsList: false,
    weight: 0,
    proteinsOfProduct: 0,
    carboOfProduct: 0,
    fatsOfProduct: 0,
    caloriesOfProduct: 0,
    saveProduct: false,
    productsArray: []
  };

  checkSaveProduct = e => {
    if (e.target.checked) this.setState({ saveProduct: true });
    else if (!e.target.checked) this.setState({ saveProduct: false });
  };

  countElements = () => {
    const multipier = this.state.weight / 100;
    const elementsAfterCount = {
      newProductName: this.state.newProductName,
      numberOfProteins:
        Math.round(this.state.numberOfProteins * multipier * 10) / 10,
      numberOfCarbohydrates:
        Math.round(this.state.numberOfCarbohydrates * multipier * 10) / 10,
      numberOfFats: Math.round(this.state.numberOfFats * multipier * 10) / 10,
      numberOfCalories:
        Math.round(this.state.numberOfCalories * multipier * 10) / 10,
      weight: this.state.weight,
      numberProduct: this.state.numberProduct + 1,
      showEditWeight: false,
      proteinsOfProduct: this.state.proteinsOfProduct,
      carboOfProduct: this.state.carboOfProduct,
      fatsOfProduct: this.state.fatsOfProduct,
      caloriesOfProduct: this.state.caloriesOfProduct
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
    if (this.state.saveProduct) this.saveProduct();
    this.countElements();
    allActions.addProduct(window.store.getState().newProduct.info);
    const allProducts = window.store.getState().allProducts.products;
    allActions.sumProducts(allProducts[allProducts.length - 1]);
    allActions.addNewProduct(window.store.getState().newProduct.info);
    this.props.addNewProduct();
    this.setState({
      multipier: 0,
      newProductName: "",
      numberProduct: 0,
      numberOfProteins: 0,
      numberOfCarbohydrates: 0,
      numberOfFats: 0,
      numberOfCalories: 0,
      showProductsList: false,
      weight: 0,
      proteinsOfProduct: 0,
      carboOfProduct: 0,
      fatsOfProduct: 0,
      caloriesOfProduct: 0,
      saveProduct: false,
      nameToSave: ""
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
    this.searchProductDouble(e);
  };

  productListDisplayOff = () => {
    const showOff = () => {
      this.setState({ showProductsList: false });
    };

    setTimeout(showOff, 1000);
  };

  saveProduct = async () => {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      name: this.state.newProductName,
      calories: this.state.numberOfCalories,
      proteins: this.state.numberOfProteins,
      fats: this.state.numberOfFats,
      carbo: this.state.numberOfCarbohydrates
    };
    try {
      let response = await fetch("/myFoodProduct", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status !== 200) throw response;
      response = await response.json();
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
        numberOfProteins: Math.round(foods.nf_protein * 10) / 10,
        numberOfCarbohydrates:
          Math.round(foods.nf_total_carbohydrate * 10) / 10,
        numberOfFats: Math.round(foods.nf_total_fat * 10) / 10,
        numberOfCalories: Math.round(foods.nf_calories * 10) / 10,
        proteinsOfProduct: Math.round(foods.nf_protein * 10) / 10,
        carboOfProduct: Math.round(foods.nf_total_carbohydrate * 10) / 10,
        fatsOfProduct: Math.round(foods.nf_total_fat * 10) / 10,
        caloriesOfProduct: Math.round(foods.nf_calories * 10) / 10
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchProductDouble = async e => {
    let nutriProductList = [];
    let myProductList = [];
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
        if (numberProduct >= 6) return;
        numberProduct += 1;
        productList.push([el.food_name, "nutri"]);
      });
      nutriProductList = productList;
    } catch (error) {
      console.log(error);
    }

    const token = localStorage.getItem("x-auth-token");
    const requestHeadersMyDB = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    try {
      let response = await fetch(`/myFoodProduct/names`, {
        method: "get",
        headers: requestHeadersMyDB
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showProductsList: true });
      const responseList = response.filter(el => {
        return el.includes(name);
      });
      const productList = [];
      let numberProduct = 0;
      responseList.forEach(el => {
        if (numberProduct >= 6) return;
        numberProduct += 1;
        productList.push([el, "my"]);
      });
      myProductList = productList;
    } catch (error) {
      console.log(error);
    }
    const dualProductList = [...nutriProductList, ...myProductList];
    this.setState({ productsArray: dualProductList });
  };

  searchProductDetailsInMyDB = async e => {
    e.preventDefault();
    const productName = e.currentTarget.innerText;
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token,
      name: productName
    };
    try {
      let response = await fetch(`/myFoodProduct`, {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();

      this.setState({
        newProductName: productName,
        showProductsList: false,
        numberOfProteins: response.proteins,
        numberOfCarbohydrates: response.carbohydrates,
        numberOfFats: response.fats,
        numberOfCalories: response.calories,
        proteinsOfProduct: response.proteins,
        carboOfProduct: response.carbohydrates,
        fatsOfProduct: response.fats,
        caloriesOfProduct: response.calories
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchDetails = e => {
    this.searchProductDetails(e);
    this.searchProductDetailsInMyDB(e);
  };

  renderListElements = el => {
    let weight = 0;
    if (el[1] === "nutri") weight = 400;
    else if (el[1] === "my") weight = 500;
    return (
      <ListGroup.Item
        style={{ fontWeight: weight }}
        key={Math.random()}
        action
        className="newProduct__productElement"
        onClick={this.searchDetails}
      >
        {el[0]}
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
                onBlur={this.productListDisplayOff}
                onChange={this.handleProductName}
                type="text"
                placeholder="Wpisz nazwę"
                value={this.state.newProductName}
                autoComplete="off"
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
          <Form>
            <Form.Group controlId="saveProduct">
              <Form.Check
                onChange={this.checkSaveProduct}
                type="checkbox"
                label="Zapisz produkt"
              />
            </Form.Group>
          </Form>
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
