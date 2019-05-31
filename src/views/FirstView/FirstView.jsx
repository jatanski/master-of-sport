import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class FirstView extends Component {
  render() {
    return (
      <div>
        Hello World!
        <Button variant="primary">Primary</Button>
      </div>
    );
  }
}
