import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

export default class RegisterView extends Component {
  changeViewAfterLogin = () => {
    this.props.history.push(`/me`);
  };
  render() {
    return (
      <div>
        <Button variant="warning">
          <Link to="/">Powrót do strony głównej</Link>
        </Button>
        <LoginForm changeView={this.changeViewAfterLogin} />
      </div>
    );
  }
}
