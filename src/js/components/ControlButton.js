import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

class ControlButton extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = props.onPress;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.controlButtonContainer}
        onPress={this.onPress}>
        <Text style={styles.controlButtonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default ControlButton;
