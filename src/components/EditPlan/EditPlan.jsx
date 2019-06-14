import React, { Component } from "react";
import "./editPlan.scss";
import {
  Tab,
  Row,
  Col,
  ListGroup,
  Table,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import NewPlanForm from "../NewPlanForm/NewPlanForm";

export default class myPlans extends Component {
  state = {
    plans: [],
    newName: "",
    showEditPlanForm: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.plans !== this.props.plans)
      this.setState({ plans: this.props.plans });
  }

  deletePlan = async e => {
    const id = e.target.id;
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    try {
      let response = await fetch(`/plans/${id}`, {
        method: "delete",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ plans: response });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  showEditPlanName = el => {
    console.log(el);
    let plans = this.state.plans;
    plans.forEach(plan => {
      if (plan.id === el.id) plan.showInput = true;
    });
    this.setState({ plans: plans });
  };

  showEditPlanForm = el => this.setState({ showEditPlanForm: true });

  changePlanName = async el => {
    console.log(el);
    let plans = this.state.plans;
    plans.forEach(plan => {
      if (plan.id === el.id) plan.showInput = false;
      plan.name = this.state.newName;
    });

    const id = el._id;
    console.log(id);
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    const requestBody = {
      newName: this.state.newName
    };
    try {
      let response = await fetch(`/plans/${id}`, {
        method: "put",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ plans: plans });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  collectNewName = e => {
    console.log(e);
    let state = "";
    state = e.target.value;
    this.setState({ newName: state });
  };

  closeInput = el => {
    let plans = this.state.plans;
    plans.forEach(plan => {
      if (plan.id === el.id) plan.showInput = false;
    });
  };

  renderTitle = el => {
    return (
      <ListGroup key={el.id}>
        <ListGroup.Item action href={el.id}>
          {el.showInput ? (
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={this.changePlanName.bind(this, el)}
                >
                  Zmień
                </Button>
              </InputGroup.Prepend>
              <FormControl value={el.name} onChange={this.collectNewName} />
              <Button
                onClick={this.closeInput.bind(this, el)}
                variant="danger"
                size="sm"
              >
                <span className="material-icons">cancel</span>
              </Button>
            </InputGroup>
          ) : (
            <div>
              <span>{el.name}</span>
              <Button
                size="sm"
                onClick={this.deletePlan}
                id={el._id}
                variant="danger"
              >
                <span class="material-icons">delete</span>
              </Button>
              <Button
                size="sm"
                onClick={this.showEditPlanName.bind(this, el)}
                id={el._id}
                variant="info"
              >
                <span class="material-icons">edit</span>
              </Button>
              <Button
                size="sm"
                onClick={this.showEditPlanForm.bind(this, el)}
                id={el._id}
                variant="secondary"
              >
                <span class="material-icons">event_note</span>
              </Button>
            </div>
          )}
        </ListGroup.Item>
      </ListGroup>
    );
  };

  renderPlans = el => {
    return (
      <div key={el.id}>
        <Tab.Pane eventKey={el.id}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td>Nazwa</td>
                <td>Liczba serii</td>
              </tr>
            </thead>
            <tbody>{el.exercises.map(this.renderExercises)}</tbody>
          </Table>
        </Tab.Pane>
      </div>
    );
  };

  renderExercises = el => {
    return (
      <tr key={el.name}>
        <td>{el.name}</td>
        <td>{el.series}</td>
      </tr>
    );
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <h1>Twoje plany treningowe</h1>
        <Tab.Container>
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item disabled href="#link">
                  Wybierz trening
                </ListGroup.Item>
              </ListGroup>
              {this.state.plans ? this.state.plans.map(this.renderTitle) : null}
            </Col>
            <Col>
              <Tab.Content>
                {this.state.plans
                  ? this.state.plans.map(this.renderPlans)
                  : null}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        {this.state.showEditPlanForm ? <NewPlanForm /> : null}
      </div>
    );
  }
}
