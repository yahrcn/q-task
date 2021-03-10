/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeRouter, Route, Link} from 'react-router-native';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import {Provider} from 'react-redux';

import {ROUTES} from './routes';
import {store} from './config';

class App extends React.Component {
  myRef = React.createRef();
  handleExit = () => {
    Alert.alert('Закрыть приложение?', '', [
      {
        text: 'НЕТ',
        onPress: () => null,
      },
      {text: 'ДА', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          {Object.keys(ROUTES).map((key, i) => {
            let route = ROUTES[key];
            if (route.component) {
              return <Route {...route} key={i} />;
            }
            return false;
          })}
          <View style={styles.navigation}>
            {Object.keys(ROUTES).map((key, i) => {
              let route = ROUTES[key];
              if (route.path) {
                return (
                  <Link
                    to={route.component ? route.path : ''}
                    key={i}
                    onPress={
                      route.component
                        ? () => null
                        : () => Linking.openURL(route.path)
                    }>
                    <Text style={styles.tab}>{route.title}</Text>
                  </Link>
                );
              }
              return (
                <Link key={i} onPress={this.handleExit} ref={this.myRef}>
                  <Text style={styles.tab}>{route.title}</Text>
                </Link>
              );
            })}
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tab: {
    paddingRight: 16,
    paddingLeft: 16,
    width: 'auto',
    height: 50,
    fontSize: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
});

export default App;
