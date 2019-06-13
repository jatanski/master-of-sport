import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.variant = {
      general: "",
      button: ""
    };

    this.props.goToStatistics
      ? (this.variant = { general: "success", button: "outline-success" })
      : (this.variant = { general: "danger", button: "outline-danger" });
  }

  onClick = () => {
    this.props.close();
    if (this.props.showOff) this.props.showOff();
    if (this.props.disabledOff) this.props.disabledOff();
  };

  render() {
    return (
      <Alert
        className="calculatorBMI__popUp"
        show={this.props.showFalsePopUp}
        variant={this.variant.general}
      >
        <Alert.Heading>{this.props.header}</Alert.Heading>
        <br />
        <p>{this.props.desc}</p>
        <hr />
        {this.props.goToStatistics ? (
          <div className="d-flex justify-content-start">
            <Link to="/statistics">
              <Button variant="outline-secondary">Przejdź do statystyk</Button>
            </Link>
          </div>
        ) : null}
        <div className="d-flex justify-content-end">
          <Button onClick={this.onClick} variant={this.variant.button}>
            Zamknij
          </Button>
        </div>
      </Alert>
    );
  }
}
