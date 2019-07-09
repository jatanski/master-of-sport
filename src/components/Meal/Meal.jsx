import React, { Component } from "react";
import "./meal.scss";
import { Table, Button } from "react-bootstrap";
import NewProduct from "../../components/NewProduct/NewProduct";
import { connect } from "react-redux";
import { allActions } from "../../redux/store";
import { MDBInput, MDBIcon } from "mdbreact";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

class Meal extends Component {
  state = {
    activeNewProduct: true,
    editWeight: 0,
    nameOfChangeWeight: "",
    numberOfProducts: 1,
    products: [],
    showNewProduct: false,
    showEditWeightModal: false,
    showDeleteProductIco: true,
    showSaveButton: true
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
          number: this.state.numberOfProducts + 1
        }
      ]
    });
  };

  changeWeight = () => {
    const differences = {};
    this.products.forEach(el => {
      if (el.newProductName === this.state.nameOfChangeWeight) {
        const newValues = {
          calories: (this.state.editWeight * el.caloriesOfProduct) / 100,
          carbo: (this.state.editWeight * el.carboOfProduct) / 100,
          fats: (this.state.editWeight * el.fatsOfProduct) / 100,
          proteins: (this.state.editWeight * el.proteinsOfProduct) / 100
        };
        differences.numberOfCalories = newValues.calories - el.numberOfCalories;
        differences.numberOfCarbohydrates =
          newValues.carbo - el.numberOfCarbohydrates;
        differences.numberOfFats = newValues.fats - el.numberOfFats;
        differences.numberOfProteins = newValues.proteins - el.numberOfProteins;

        el.weight = this.state.editWeight;
        el.numberOfCalories = newValues.calories;
        el.numberOfCarbohydrates = newValues.carbo;
        el.numberOfFats = newValues.fats;
        el.numberOfProteins = newValues.proteins;
      }
    });
    allActions.changeProduct(window.store.getState().allProducts.products);
    allActions.sumProducts(differences);
    this.summary = {
      calories: this.summary.calories + differences.numberOfCalories,
      proteins: this.summary.proteins + differences.numberOfProteins,
      carbohydrates:
        this.summary.carbohydrates + differences.numberOfCarbohydrates,
      fats: this.summary.fats + differences.numberOfFats
    };
    this.closeEditWeight();
  };

  createNewProduct = el => {
    return (
      <tr key={el.numberProduct}>
        <td className="tdName">
          {" "}
          {el.newProductName}{" "}
          {this.state.showDeleteProductIco ? (
            <MDBIcon icon="trash" onClick={this.deleteProduct.bind(this, el)} />
          ) : null}
        </td>
        <td onClick={this.showEditWeight.bind(this, el)}>{el.weight} g</td>
        <td>{el.numberOfCalories} kcal</td>
        <td>{el.numberOfProteins} g</td>
        <td>{el.numberOfCarbohydrates} g</td>
        <td>{el.numberOfFats} g</td>
      </tr>
    );
  };

  closeNewProduct = () => {
    this.setState({ showNewProduct: false });
  };

  changeAddNewProduct = () => {
    this.setState({ activeNewProduct: !this.state.activeNewProduct });
  };

  changeSaveButton = () => {
    this.setState({
      showSaveButton: !this.state.showSaveButton,
      showDeleteProductIco: !this.state.showDeleteProductIco
    });
    this.changeAddNewProduct();
    this.props.disabledOff();
    this.props.disabledOffSavePlan();
    let noCreateNewMeal = false;
    window.store.getState().mealNew.meals.forEach(el => {
      if (el.number === this.props.number) noCreateNewMeal = true;
    });
    if (!noCreateNewMeal) {
      allActions.sumMeals(window.store.getState().sumProducts.sumOfElements);
      const toSave = {
        products: this.products,
        summary: this.summary,
        number: this.props.number
      };
      allActions.addNewMeal(toSave);
      allActions.resetProduct();
    }
  };

  changeEditButton = () => {
    this.setState({
      showSaveButton: !this.state.showSaveButton,
      showDeleteProductIco: !this.state.showDeleteProductIco
    });
    this.changeAddNewProduct();
    this.props.disabledOff();
    this.props.disabledOffSavePlan();
  };

  deleteProduct = el => {
    const deleteProduct = {};
    deleteProduct.numberOfCalories = -el.numberOfCalories;
    deleteProduct.numberOfCarbohydrates = -el.numberOfCarbohydrates;
    deleteProduct.numberOfFats = -el.numberOfFats;
    deleteProduct.numberOfProteins = -el.numberOfProteins;

    allActions.sumProducts(deleteProduct);
    this.summary = {
      calories: this.summary.calories + deleteProduct.numberOfCalories,
      proteins: this.summary.proteins + deleteProduct.numberOfProteins,
      carbohydrates:
        this.summary.carbohydrates + deleteProduct.numberOfCarbohydrates,
      fats: this.summary.fats + deleteProduct.numberOfFats
    };
    const numberOfChangeProduct = el.numberOfProducts;
    this.products.splice(el.numberOfProducts - 1, 1);

    this.products.forEach(product => {
      if (product.numberOfProducts > numberOfChangeProduct)
        product.numberOfProducts -= 1;
    });
    allActions.changeProduct(this.products);
  };

  handleNumberInputChange = e => {
    const state = {};
    state[`${e.target.id}`] = Number(e.target.value);
    this.setState(state);
  };

  showEditWeight = el => {
    this.setState({
      showEditWeightModal: !this.state.showEditWeightModal,
      nameOfChangeWeight: el.newProductName
    });
  };

  closeEditWeight = () => {
    this.setState({ showEditWeightModal: !this.state.showEditWeightModal });
  };

  showNewProduct = () => {
    if (this.state.activeNewProduct) {
      this.setState({ showNewProduct: true });
    }
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
      <div key={this.props.number} className="meal">
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
        {this.state.showSaveButton ? (
          <Button
            size="lg"
            disabled={this.state.disabledSaveButton}
            onClick={this.changeSaveButton}
            variant="success"
          >
            Zapisz posiłek
          </Button>
        ) : (
          <Button
            size="lg"
            disabled={this.state.disabledEditButton}
            onClick={this.changeEditButton}
            variant="info"
          >
            Edytuj posiłek
          </Button>
        )}

        {this.renderNewProduct()}
        {this.state.showEditWeightModal ? (
          <MDBModalHeader>
            <MDBModal
              isOpen={this.state.showEditWeightModal}
              toggle={this.showEditWeight}
              centered
              size="sm"
            >
              <MDBModalHeader toggle={this.showEditWeight}>
                Zmień gramaturę
              </MDBModalHeader>
              <MDBModalBody>
                Waga:{" "}
                <MDBInput
                  id="editWeight"
                  onChange={this.handleNumberInputChange}
                  size="sm"
                  type="number"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  size="sm"
                  onClick={this.showEditWeight}
                >
                  Zamknij
                </MDBBtn>
                <MDBBtn size="sm" color="primary" onClick={this.changeWeight}>
                  Zapisz
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBModalHeader>
        ) : null}
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
