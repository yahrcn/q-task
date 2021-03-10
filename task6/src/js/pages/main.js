import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Link} from 'react-router-native';

import {ROUTES} from '../routes';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>hello</Text>
        <Link to={ROUTES.slider.path}>
          <Text style={styles.button}>Слайдер</Text>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 16,
  },
});
