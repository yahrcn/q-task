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
});

export default styles;
