import React from 'react';
import {View, Text, Image} from 'react-native';
import ControlButton from '../components/ControlButton';
import TrackPlayer from 'react-native-track-player';

import local1 from '../../songs/local1.mp3';
import local2 from '../../songs/local2.mp3';
import local3 from '../../songs/local3.mp3';

const localArray = [local1, local2, local3];

import styles from '../styles';

class Player extends React.Component {
  state = {
    isPlaying: false,
    currentSongId: 0,
    currentSong: {
      id: 0,
      title: '0',
      url: null,
    },
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.setup();
    let result = await fetch(
      'https://imagesapi.osora.ru/?isAudio=true',
    ).then((res) => res.json());
    let array = result.concat(localArray);
    array.forEach(async (item, i) => {
      await TrackPlayer.add({
        id: i,
        url: item,
        title: `Песня номер ${i + 1}`,
      });
    });
    this.setState({currentSong: await TrackPlayer.getTrack('0')});
    const playerState = await TrackPlayer.getState();
    if (playerState === TrackPlayer.STATE_PLAYING) {
      this.setState({isPlaying: true});
    } else this.setState({isPlaying: false});
  }

  async setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  handleNextSong = async () => {
    await TrackPlayer.skipToNext();
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );
    this.setState({currentSong: currentTrack});
  };

  handlePrevSong = async () => {
    await TrackPlayer.skipToPrevious();
    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack(),
    );
    this.setState({currentSong: currentTrack});
  };

  handleMiddleButton = async () => {
    const playerState = await TrackPlayer.getState();
    if (playerState === TrackPlayer.STATE_PLAYING) {
      TrackPlayer.pause();
      this.setState({isPlaying: false});
    } else {
      TrackPlayer.play();
      this.setState({isPlaying: true});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text styles={styles.title}>
            {'Title: ' + this.state.currentSong.title}
          </Text>
          <View style={styles.controls}>
            <ControlButton title={'<<'} onPress={this.handlePrevSong} />
            <ControlButton
              title={this.state.isPlaying ? 'Pause' : 'Play'}
              onPress={this.handleMiddleButton}
            />
            <ControlButton title={'>>'} onPress={this.handleNextSong} />
          </View>
        </View>
      </View>
    );
  }
}

export default Player;
