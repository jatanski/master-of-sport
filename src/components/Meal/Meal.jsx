import React, { Component } from "react";
import "./meal.scss";
import { Table } from "react-bootstrap";
import NewProduct from "../../components/NewProduct/NewProduct";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  newProductInfo: state.newProduct.info
});

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
    },
    sumOfElements: {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0
    }
  };
  addNewProduct = () => {
    this.closeNewProduct();
    console.log(this.props);
    this.setState({
      numberOfProducts: this.state.numberOfProducts + 1,
      products: [
        ...this.state.products,
        {
          number: this.state.numberOfProducts,
          name: this.props.newProductInfo.newProductName,
          calories: this.props.newProductInfo.numberOfCalories,
          proteins: this.props.newProductInfo.numberOfProteins,
          carbohydrates: this.props.newProductInfo.numberOfCarbohydrates,
          fats: this.props.newProductInfo.numberOfFats,
          weight: this.props.newProductInfo.weight
        }
      ]
    });
  };

  createNewProduct = el => {
    return (
      <tr key={el.number}>
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
    console.log(this.props);
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

  sumOfElements = () => {
    const elements = {};

    this.state.products.forEach(el => {
      elements.calories += el.numberOfCalories;
      elements.proteins += el.numberOfProteins;
      elements.carbohydrates += el.numberOfCarbohydrates;
      elements.fats += el.numberOfFats;
    });

    this.setState({ sumOfElements: elements });
  };

  render() {
    console.log(this.state);
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
            {this.state.products
              ? this.state.products.map(this.createNewProduct)
              : null}
            <tr>
              <td>
                {" "}
                <span className="addNewProduct" onClick={this.showNewProduct}>
                  Dodaj nowy produkt
                </span>{" "}
              </td>
              <td />
              <td>{this.state.sumOfElements.calories} kcal</td>
              <td>{this.state.sumOfElements.proteins} g</td>
              <td>{this.state.sumOfElements.carbohydrates} g</td>
              <td>{this.state.sumOfElements.fats} g</td>
            </tr>
          </tbody>
        </Table>
        {this.renderNewProduct()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(Meal);
