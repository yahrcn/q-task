import React from 'react';
import {View, Text} from 'react-native';

import styles from '../styles';

class Player extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Player</Text>
      </View>
    );
  }
}

export default Player;
