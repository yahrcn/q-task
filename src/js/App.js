/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeRouter, Route} from 'react-router-native';
import {Provider} from 'react-redux';
import Navigation from './components/Navigation';

import {ROUTES} from './routes';
import {store} from './config';

class App extends React.Component {
  getRoutes(key, i) {
    let route = ROUTES[key];
    if (route.component) {
      return <Route {...route} key={i} />;
    }
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          {Object.keys(ROUTES).map(this.getRoutes)}
          <Navigation routes={ROUTES} />
        </NativeRouter>
      </Provider>
    );
  }
}

export default App;
