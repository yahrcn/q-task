import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { store } from "./js/config";
import "./scss/index.scss";

const App = React.lazy(() => import("./js/App"));

ReactDOM.render(
  <Provider store={store}>
    <Router history>
      <React.Suspense fallback={"Loading..."}>
        <App />
      </React.Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
