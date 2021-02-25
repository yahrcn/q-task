import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

export default class Main extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="text">hello</div>
        <Link to={ROUTES.slider.path} className="button">
          Слайдер
        </Link>
      </div>
    );
  }
}
