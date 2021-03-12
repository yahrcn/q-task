import React from 'react';
import {View, Text, BackHandler, Alert, Linking} from 'react-native';
import {Link} from 'react-router-native';

import styles from '../styles';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.route = props.route;
  }

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
    if (!this.route.path) {
      return (
        <Link
          onPress={this.handleExit}
          ref={this.myRef}
          underlayColor={'white'}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>{this.route.title}</Text>
          </View>
        </Link>
      );
    }
    return (
      <Link
        to={this.route.component ? this.route.path : ''}
        underlayColor={'white'}
        onPress={
          this.route.component
            ? () => null
            : () => Linking.openURL(this.route.path)
        }>
        <View style={styles.tab}>
          <Text style={styles.tabText}>{this.route.title}</Text>
        </View>
      </Link>
    );
  }
}

export default Tab;
