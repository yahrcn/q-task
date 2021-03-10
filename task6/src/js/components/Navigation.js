import React from 'react';
import {View} from 'react-native';

import Tab from './Tab';
import styles from '../styles';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.routes = props.routes;
  }

  render() {
    return (
      <View style={styles.navigation}>
        {Object.keys(this.routes).map((key, i) => {
          let route = this.routes[key];
          return <Tab route={route} key={i} />;
        })}
      </View>
    );
  }
}

export default Navigation;
