import React from "react";
import { Switch, Route } from "react-router-dom";

import "../scss/index.scss";
import { ROUTES } from "./routes";

class App extends React.Component {
  render() {
    return (
      <Switch>
        {Object.keys(ROUTES).map((key, i) => {
          let route = ROUTES[key];
          return <Route {...route} key={i} />;
        })}
      </Switch>
    );
  }
}

export default App;
