import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export default class Input extends Component {
  render() {
    if (this.props.start) this.value = "";
    return (
      <InputGroup className="calculatorBMI__form__inputGroup">
        <InputGroup.Prepend>
          <InputGroup.Text className="input-custom">
            {this.props.text}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="calculatorBMI__form__input"
          type="number"
          onChange={this.props.collectData}
          id={this.props.id}
          value={this.value}
        />
      </InputGroup>
    );
  }
}
