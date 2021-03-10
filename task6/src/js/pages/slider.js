import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-native';
import {setImages} from '../redux/actions';
import {ROUTES} from '../routes';
import {Button, StyleSheet, View, Text, Image} from 'react-native';

import first from '../../img/1.jpg';
import second from '../../img/2.jpg';
import third from '../../img/3.jpg';

const images = [first, second, third];

const mapStateToProps = (store) => ({
  photos: store.photos,
});

const mapDispatchToProps = (dispatch) => ({
  setImages(images) {
    dispatch(setImages(images));
  },
});

class Slider extends React.Component {
  state = {
    remote: false,
    text: 'remote',
    array: images,
    currentId: 0,
  };
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  componentDidMount() {
    fetch('https://imagesapi.osora.ru/', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((result) => {
        this.props.setImages(result);
      });
  }

  handleNext() {
    const lastIndex = this.state.array.length - 1;
    const resetIndex = this.state.currentId === lastIndex;
    const index = resetIndex ? 0 : this.state.currentId + 1;
    this.setState({
      currentId: index,
    });
  }

  handlePrev() {
    const lastIndex = this.state.array.length - 1;
    const resetIndex = this.state.currentId === 0;
    const index = resetIndex ? lastIndex : this.state.currentId - 1;
    this.setState({
      currentId: index,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliderWrapper}>
          <Text style={styles.button} onPress={this.handlePrev}>
            prev
          </Text>
          {this.state.remote ? (
            <Image
              style={styles.slider}
              alt=""
              source={{uri: this.props.photos[this.state.currentId]}}
            />
          ) : (
            <Image
              style={styles.slider}
              alt=""
              source={images[this.state.currentId]}
            />
          )}

          <Text style={styles.button} onPress={this.handleNext}>
            next
          </Text>
        </View>
        <Text
          style={styles.button_switch}
          onPress={() => {
            this.setState(
              this.state.remote
                ? {remote: false, text: 'remote', array: images, currentId: 0}
                : {
                    remote: true,
                    text: 'local',
                    array: this.props.photos,
                    currentId: 0,
                  },
            );
          }}>
          switch to {this.state.text}
        </Text>
        <Link to={ROUTES.main.path}>
          <Text style={styles.button}>back to main</Text>
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
  sliderWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slider: {
    margin: 10,
    width: 250,
    height: 200,
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  button: {
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 16,
  },
  button_switch: {
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
