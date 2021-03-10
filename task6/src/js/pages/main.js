import React from 'react';
import {View, Text} from 'react-native';
import {Link} from 'react-router-native';

import {ROUTES} from '../routes';
import styles from '../styles';

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
