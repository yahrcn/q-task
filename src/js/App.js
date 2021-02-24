import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import "../scss/index.scss";
import {routes} from "./routes"

class App extends React.Component {
  render() {
    return (
        <Switch>
          {routes.map((route, i) => (
            <Route path={route.path} component={route.component} key={i} />
          ))}
        </Switch>
    );
  }
}

export default withRouter(App);
