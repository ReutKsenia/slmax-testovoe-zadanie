import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import store from './redux/reduxStore';
import {GENERAL} from './assets/colors';
import {ThemeContext, ThemeProvider} from './components/ThemeProvider';
import SwitchTheme from './components/SwitchTheme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
};

function MainPage() {
  const {colors, isDark} = useContext(ThemeContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ImageBackground
        source={
          isDark
            ? require('./assets/bgDark.png')
            : require('./assets/bgLight.png')
        }
        style={{width: Dimensions.get('window').width, height: 210}}
      />
      <Text style={styles.title}>Заметки</Text>
      <View style={styles.switchContainer}>
        <SwitchTheme />
      </View>
      <NotesList />
      <AddNote />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },
  title: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    textAlign: 'center',
    marginTop: 80,
    fontSize: 28,
    fontWeight: '600',
    color: GENERAL.white,
  },
});

export default App;
