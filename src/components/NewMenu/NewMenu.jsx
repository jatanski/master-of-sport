import React, { Component } from "react";
import { Dropdown, Table, Button } from "react-bootstrap";
import "./newMenu.scss";
import CustomAlert from "../../components/Alert/Alert";

export default class NewMenu extends Component {
  state = {
    choosenPlan: "",
    plans: [],
    showSummaryTable: false,
    showMealTables: false,
    showButtonSave: false,
    showSuccessPopUp: false,
    showFalsePopUp: false,
    summary: {},
    meals: [],
    numberOfMeal: 1
  };

  alertText = {
    success: {
      header: "Jadłospis został zapisany.",
      desc:
        "Możesz teraz przejrzeć swoje wszystkie jadłospisy w statystykach. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Dodałeś już dzisiaj jadłospis.",
      desc: "Spróbuj ponownie jutro."
    },
    goTo1: {
      text: "Statystyki",
      link: "/statistics"
    }
  };

  meals = [];
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });
  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });

  componentDidMount = async () => {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    try {
      let response = await fetch("/nutritionalPlans", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ plans: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  saveMenu = async () => {
    const now = `${new Date().getDate()}.${new Date().getMonth() +
      1}.${new Date().getFullYear()}`;
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      name: this.state.choosenPlan,
      date: now,
      meals: this.state.meals,
      summary: this.state.summary
    };
    try {
      let response = await fetch("/menus", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({
        showSuccessPopUp: true,
        meals: [],
        summary: {},
        numberOfMeal: 1,
        showButtonSave: false,
        showMealTables: false,
        showSummaryTable: false
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  showPlanToChoose = el => {
    return (
      <Dropdown.Item
        key={el._id}
        onClick={this.renderTable.bind(this, el)}
        as="button"
      >
        {el.name}
      </Dropdown.Item>
    );
  };

  renderMeals = el => {
    return (
      <div key={Math.random()} className="meal">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan="6">
                <span className="numberOfMeal">
                  Posiłek {this.state.numberOfMeal}
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
            {el.products.map(this.renderProduct)}
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
              <td>{el.summary.calories} kcal</td>
              <td>{el.summary.proteins} g</td>
              <td>{el.summary.carbohydrates} g</td>
              <td>{el.summary.fats} g</td>
            </tr>
          </tbody>
        </Table>
        {/* <Button
          size="lg"
          onClick={this.changeSaveButton}
          variant={this.state.saveButton.variant}
        >
          {this.state.saveButton.text}
        </Button> */}
        {this.renderNewProduct()}
      </div>
    );
  };

  renderProduct = el => {
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

  renderNewProduct = el => {};

  renderTable = el => {
    console.log(this, el);
    this.setState({
      choosenPlan: el.name,
      summary: el.summary,
      meals: el.meals,
      showSummaryTable: true,
      showMealTables: true,
      showButtonSave: true
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="newMenu">
        {" "}
        <Dropdown className="todayTraining__chooseDropdown">
          <Dropdown.Toggle size="lg" variant="info" id="choosePlan">
            Wybierz plan dietetyczny
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.state.plans
              ? this.state.plans.map(this.showPlanToChoose)
              : null}
          </Dropdown.Menu>
        </Dropdown>
        {this.state.showSummaryTable ? (
          <div className="table">
            <Table
              className="caloriesSummaryTable"
              striped
              bordered
              hover
              variant="dark"
            >
              <thead>
                <tr>
                  <td />
                  <td>Kalorie</td>
                  <td>Białko</td>
                  <td>Węglowodany</td>
                  <td>Tłuszcze</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="summaryDay">Suma dobowa</td>
                  <td>{this.state.summary.calories} kcal</td>
                  <td>{this.state.summary.proteins} g</td>
                  <td>{this.state.summary.carbohydrates} g</td>
                  <td>{this.state.summary.fats} g</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : null}
        {this.state.showMealTables
          ? this.state.meals.map(this.renderMeals)
          : null}
        {this.state.showButtonSave ? (
          <Button
            className="newMenu__saveMenu"
            variant="success"
            size="lg"
            onClick={this.saveMenu}
          >
            {" "}
            Zapisz Jadłospis
          </Button>
        ) : null}
        {this.state.showSuccessPopUp ? (
          <CustomAlert
            header={this.alertText.success.header}
            desc={this.alertText.success.desc}
            close={this.closeSuccessPopUp}
            goTo1Text={this.alertText.goTo1.text}
            goTo1Link={this.alertText.goTo1.link}
          />
        ) : null}
        {this.state.showFalsePopUp ? (
          <CustomAlert
            header={this.alertText.fail.header}
            desc={this.alertText.fail.desc}
            close={this.closeFalsePopUp}
          />
        ) : null}
      </div>
    );
  }
}
