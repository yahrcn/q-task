import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
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
  text: {
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
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
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 50,
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#333',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  tabText: {
    padding: '3.8%',
  },
  card: {
    width: '80%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  title: {
    marginTop: 10,
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
