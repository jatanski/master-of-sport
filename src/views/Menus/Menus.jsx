import React, { Component } from "react";
import Instruction from "../../components/Instruction/Instruction";
import NewMenu from "../../components/NewMenu/NewMenu";

export default class Menus extends Component {
  render() {
    return (
      <section className="menus">
        <Instruction
          header="Wprowadź swój dzisiejszy jadłospis"
          description="Dzięki monitorowaniu swoich dziennych jadłospisów możesz w łatwy sposób analizować wpływ zmian w jedzieniu na Twoją formę. Staraj się prowadzić dziennik zywieniowy regularnie, maksymalizuje to jakość Twoich statyk, które możesz później podesłać swojemu trenerowi lub dietetykowi."
          instruction=""
        />
        <NewMenu />
      </section>
    );
  }
}
