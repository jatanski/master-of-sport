import React, { Component } from "react";
import "./mainView.scss";
import CardMainView from "../../components/CardMainView/CardMainView";
import workoutPlanImg from "../../img/cards/plan-treningowy.jpg";
import dietPlanImg from "../../img/cards/plan-dietetyczny.jpg";
import addWorkoutImg from "../../img/cards/dodaj-trening.jpg";
import addMenuImg from "../../img/cards/dodaj-jadłospis.jpg";
import circuitsImg from "../../img/cards/pomiary.jpg";
import statisticsImg from "../../img/cards/statystyki.jpg";
import bmiImg from "../../img/cards/bmi.jpg";

export default class MainView extends Component {
  cardsDetails = {
    newWorkoutPlan: {
      title: "Nowy plan treningowy",
      text:
        "Stwórz plan treningowy, który później możesz użyć podczas treningu.",
      img: workoutPlanImg,
      link: "/workoutplans"
    },
    newDietPlan: {
      title: "Nowy plan dietetyczny",
      text:
        "Stwórz plan dietetyczny, dzięki któremu łatwiej będzie Ci trzymać dietę.",
      img: dietPlanImg,
      link: "/calculator"
    },
    addWorkout: {
      title: "Dzisiejszy trening",
      text:
        "Zapisz swój ostatni trening, aby mieć kontrolę nad swoimi postępami.",
      img: addWorkoutImg,
      link: "/diary"
    },
    addMenu: {
      title: "Dzisiejszy jadłospis",
      text:
        "Zapisz swój dzisiejszy jadłospis, aby mieć kontrolę nad swoimi postępami.",
      img: addMenuImg,
      link: "/menus"
    },
    addCircuits: {
      title: "Pomiary ciała",
      text:
        "Zapisuj okresowe pomiary ciała i wagę, dzięki czemu zobaczysz swoje postępy.",
      img: circuitsImg,
      link: "/circuits"
    },
    statistics: {
      title: "Statystyki",
      text:
        "Znajdziesz tutaj wszystkie zapisane pomiary, odbyte treningi oraz jadłospisy.",
      img: statisticsImg,
      link: "/statistics"
    },
    bmi: {
      title: "Wskaźnik BMI",
      text:
        "Sprawdzisz tutaj swój wskaźnik BMI, który później można zapisać do statystyk.",
      img: bmiImg,
      link: "/bmi"
    }
  };
  render() {
    return (
      <section className="mainView">
        <CardMainView info={this.cardsDetails.newWorkoutPlan} />
        <CardMainView info={this.cardsDetails.newDietPlan} />
        <CardMainView info={this.cardsDetails.addWorkout} />
        <CardMainView info={this.cardsDetails.addMenu} />
        <CardMainView info={this.cardsDetails.addCircuits} />
        <CardMainView info={this.cardsDetails.statistics} />
        {/* <CardMainView info={this.cardsDetails.bmi} /> */}
      </section>
    );
  }
}
