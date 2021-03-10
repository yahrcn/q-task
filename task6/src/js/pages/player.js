import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Player extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Player</Text>
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
    textAlign: 'center',
  },
});

export default Player;
