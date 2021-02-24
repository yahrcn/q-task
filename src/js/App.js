import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Slider from './pages/slider'
import Main from './pages/main'
import "../scss/App.scss";

class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
        
        <Switch>
          <Route history={history} path="/slider" component={Slider} />
          <Route history={history} path="/main" component={Main} />
          <Redirect from="/" to="/main" />
        </Switch>
    );
  }
}

export default withRouter(App);
