import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import "./alert.scss";

export default class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.variant = {
      general: "",
      button: ""
    };

    this.props.goTo1Text
      ? (this.variant = { general: "success", button: "outline-success" })
      : (this.variant = { general: "danger", button: "outline-danger" });
  }

  onClick = () => {
    this.props.close();
    if (this.props.extraFunc) this.props.extraFunc();
    if (this.props.showOff) this.props.showOff();
    if (this.props.disabledOff) this.props.disabledOff();
  };

  render() {
    return (
      <Alert
        className="calculatorBMI__popUp customAlert"
        show={this.props.showFalsePopUp}
        variant={this.variant.general}
      >
        <Alert.Heading>{this.props.header}</Alert.Heading>
        <br />
        <p>{this.props.desc}</p>
        <hr />
        <div className="d-flex justify-content-between">
          {this.props.goTo1Text ? (
            <Link to={this.props.goTo1Link}>
              <Button variant="outline-secondary">
                {this.props.goTo1Text}
              </Button>
            </Link>
          ) : null}
          {this.props.goTo2Text ? (
            <Link to={this.props.goTo2Link}>
              <Button variant="outline-secondary">
                {this.props.goTo2Text}
              </Button>
            </Link>
          ) : null}
          <Button onClick={this.onClick} variant={this.variant.button}>
            Zamknij
          </Button>
        </div>
      </Alert>
    );
  }
}
