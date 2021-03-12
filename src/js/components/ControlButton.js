import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';

class ControlButton extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = props.onPress;
  }

  render() {
    return (
      <View style={{flex: 1, opacity: this.props.opacity}}>
        <Text style={styles.controlButtonText} onPress={this.onPress}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default ControlButton;
