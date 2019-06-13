import React, { Component } from "react";
import "./myPlans.scss";
import EditPlan from "../../components/EditPlan/EditPlan";
import WorkoutsStatistics from "../../components/WorkoutsStatistics/WorkoutsStatistics";

export default class myPlans extends Component {
  state = {
    plans: [],
    workouts: []
  };

  async componentDidMount() {
    let workouts = {};
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/plans", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      response.forEach(el => {
        el.id = `#${el._id}`;
        el.showInput = false;
      });
      this.setState({ plans: response });
      response.forEach(el => {
        workouts[`${el.name}`] = [];
      });
      this.setState({ workouts: workouts });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <EditPlan plans={this.state.plans} />
        <WorkoutsStatistics
          workouts={this.state.workouts}
          plans={this.state.plans}
        />
      </div>
    );
  }
}
