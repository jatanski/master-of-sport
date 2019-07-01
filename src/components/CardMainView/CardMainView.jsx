import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class CardMainView extends Component {
  render() {
    return (
      <section className="mainView__card">
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={this.props.info.img} />
          <Card.Body>
            <Card.Title>{this.props.info.title}</Card.Title>
            <Card.Text>{this.props.info.text}</Card.Text>
            <Link to={this.props.info.link}>
              <Button variant="primary">Przejdź</Button>
            </Link>
          </Card.Body>
        </Card>
      </section>
    );
  }
}
