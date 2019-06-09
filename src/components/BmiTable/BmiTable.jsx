import React, { Component } from "react";
import "./bmiTable.scss";
import { Table } from "react-bootstrap";

export default class BmiTable extends Component {
  rows = {
    1: React.createRef(),
    2: React.createRef(),
    3: React.createRef(),
    4: React.createRef(),
    5: React.createRef(),
    6: React.createRef(),
    7: React.createRef(),
    8: React.createRef()
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      let id = "";
      for (const el in this.rows) {
        if (this.props.id === el) id = el;
      }
      console.log(id);
      console.log(this.rows[id]);
      this.rows[id].current.style.backgroundColor = "lightskyblue";
    }
  }

  changeColor = e => {
    if ((this.props.id = e.target.value)) {
      console.log(e.target.id);
    }
  };
  render() {
    return (
      <Table className="calculatorBMI__table" striped bordered hover>
        <thead>
          <tr style={{ fontWeight: 500 }}>
            <td>Wartość</td>
            <td>Co oznacza?</td>
          </tr>
        </thead>
        <tbody>
          <tr className="redRow" id="1" ref={this.rows[1]}>
            <td>>16,0</td>
            <td>Wygłodzenie</td>
          </tr>
          <tr className="redRow" id="2" ref={this.rows[2]}>
            <td>16,0 - 17,0</td>
            <td>Wychudzenie</td>
          </tr>
          <tr className="orangeRow" id="3" ref={this.rows[3]}>
            <td>17,0 - 18,5</td>
            <td>Niedowaga</td>
          </tr>
          <tr className="greenRow" id="4" ref={this.rows[4]}>
            <td>18,5 - 30</td>
            <td>Wartość prawidłowa</td>
          </tr>
          <tr className="orangeRow" id="5" ref={this.rows[5]}>
            <td>25,0 - 30,0</td>
            <td>Nadwaga</td>
          </tr>
          <tr className="redRow" id="6" ref={this.rows[6]}>
            <td>30,0 - 35,0</td>
            <td>I stopień otyłości</td>
          </tr>
          <tr className="redRow" id="7" ref={this.rows[7]}>
            <td>35,0 - 40,0</td>
            <td>II stopień otyłości</td>
          </tr>
          <tr className="redRow" id="8" ref={this.rows[8]}>
            <td>40+</td>
            <td>III stopień otyłości</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
