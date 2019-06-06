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

  addNewProduct = () => {
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
    console.log(el);
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
    console.log(this.state);
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
    allActions.sumMeals(window.store.getState().sumProducts.sumOfElements);
    allActions.addMeal(window.store.getState().product.products);
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
    console.log(this.props);
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan="6">
                {" "}
                <span className="numberOfMeal">
                  Posiłek {this.props.number}
                </span>{" "}
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
            {this.props.products
              ? this.props.products.map(this.createNewProduct)
              : null}
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
              <td>{this.props.sumOfElements.calories} kcal</td>
              <td>{this.props.sumOfElements.proteins} g</td>
              <td>{this.props.sumOfElements.carbohydrates} g</td>
              <td>{this.props.sumOfElements.fats} g</td>
            </tr>
          </tbody>
        </Table>
        <Button
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
