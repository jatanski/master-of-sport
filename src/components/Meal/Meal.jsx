import React, { Component } from "react";
import "./meal.scss";
import { Table } from "react-bootstrap";
import NewProduct from "../../components/NewProduct/NewProduct";
import { connect } from "react-redux";

class Meal extends Component {
  state = {
    numberOfProducts: 1,
    products: [],
    showNewProduct: false,
    newProductInfo: {
      newProductName: "",
      numberOfProteins: 0,
      numberOfCarbohydrates: 0,
      numberOfFats: 0,
      numberOfCalories: 0
    }
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
    return (
      <tr key={Math.random()}>
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
    this.setState({ showNewProduct: true });
  };

  closeNewProduct = () => {
    this.setState({ showNewProduct: false });
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
    // console.log(this);
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
                {" "}
                <span className="addNewProduct" onClick={this.showNewProduct}>
                  Dodaj nowy produkt
                </span>{" "}
              </td>
              <td />
              <td>{this.props.sumOfElements.calories} kcal</td>
              <td>{this.props.sumOfElements.proteins} g</td>
              <td>{this.props.sumOfElements.carbohydrates} g</td>
              <td>{this.props.sumOfElements.fats} g</td>
            </tr>
          </tbody>
        </Table>
        {this.renderNewProduct()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProducts.products,
  sumOfElements: state.sumProducts.sumOfElements
});

export default connect(
  mapStateToProps,
  {}
)(Meal);
