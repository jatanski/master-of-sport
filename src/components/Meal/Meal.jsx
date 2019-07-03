import React, { Component } from "react";
import "./meal.scss";
import { Table, Button } from "react-bootstrap";
import NewProduct from "../../components/NewProduct/NewProduct";
import { connect } from "react-redux";
import { allActions } from "../../redux/store";

class Meal extends Component {
  state = {
    numberOfProducts: 1,
    products: [],
    showNewProduct: false,
    saveButton: {
      text: "Zapisz posiłek",
      variant: "success"
    },
    activeNewProduct: true
  };

  products = [];
  summary = {
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0
  };

  addNewProduct = () => {
    const product = window.store.getState().newProduct.info;
    this.products.push(product);
    this.summary = {
      calories: this.summary.calories + product.numberOfCalories,
      proteins: this.summary.proteins + product.numberOfProteins,
      carbohydrates: this.summary.carbohydrates + product.numberOfCarbohydrates,
      fats: this.summary.fats + product.numberOfFats
    };
    this.closeNewProduct();
    this.setState({
      numberOfProducts: this.state.numberOfProducts + 1,
      products: [
        ...this.state.products,
        {
          number: this.state.numberOfProducts
        }
      ]
    });
  };

  createNewProduct = el => {
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

  showNewProduct = () => {
    if (this.state.activeNewProduct) {
      this.setState({ showNewProduct: true });
    }
  };

  closeNewProduct = () => {
    this.setState({ showNewProduct: false });
  };

  changeAddNewProduct = () => {
    this.setState({ activeNewProduct: false });
  };

  changeSaveButton = () => {
    this.setState({
      saveButton: {
        text: "Edytuj posiłek",
        variant: "info"
      }
    });
    this.changeAddNewProduct();
    this.props.disabledOff();
    this.props.disabledOffSavePlan();
    allActions.sumMeals(window.store.getState().sumProducts.sumOfElements);
    const toSave = { products: this.products, summary: this.summary };
    allActions.addNewMeal(toSave);
    allActions.resetProduct();
  };

  renderNewProduct() {
    return (
      <NewProduct
        show={this.state.showNewProduct}
        close={this.closeNewProduct}
        addNewProduct={this.addNewProduct}
      />
    );
  }

  render() {
    return (
      <div className="meal">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan="6">
                <span className="numberOfMeal">
                  Posiłek {this.props.number}
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
            {this.products ? this.products.map(this.createNewProduct) : null}
            <tr>
              <td>
                {this.state.activeNewProduct ? (
                  <span className="addNewProduct" onClick={this.showNewProduct}>
                    Dodaj nowy produkt
                  </span>
                ) : (
                  <span>Dodaj nowy produkt</span>
                )}
              </td>
              <td />
              <td>{this.summary.calories} kcal</td>
              <td>{this.summary.proteins} g</td>
              <td>{this.summary.carbohydrates} g</td>
              <td>{this.summary.fats} g</td>
            </tr>
          </tbody>
        </Table>
        <Button
          size="lg"
          onClick={this.changeSaveButton}
          variant={this.state.saveButton.variant}
        >
          {this.state.saveButton.text}
        </Button>
        {this.renderNewProduct()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProducts.products,
  sumOfElements: state.sumProducts.sumOfElements,
  meal: state.meal,
  product: state.product.products
});

export default connect(
  mapStateToProps,
  {}
)(Meal);
