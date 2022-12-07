import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
} from 'react-native';
import {Provider} from 'react-redux';
import colors from './assets/colors';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import store from './redux/reduxStore';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={require('./assets/bgLight.png')}
          style={{width: Dimensions.get('window').width, height: 210}}
        />
        <Text style={styles.title}>Заметки</Text>
        <NotesList />
        <AddNote />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    textAlign: 'center',
    marginTop: 80,
    fontSize: 28,
    fontWeight: '600',
    color: colors.white,
  },
});

export default App;
