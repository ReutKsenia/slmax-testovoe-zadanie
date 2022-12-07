import React, {useContext, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {GENERAL} from '../assets/colors';
import Icon from './Icon';
import {ThemeContext} from './ThemeProvider';

const SwitchTheme = () => {
  const {colors, isDark, setColorScheme} = useContext(ThemeContext);
  //   const [themeDark, setThemeDark] = useState()
  const handleChangeColorTheme = (isTrue: boolean) =>
    setColorScheme(isTrue ? 'dark' : 'light');

  return (
    <Pressable onPress={() => handleChangeColorTheme(!isDark)}>
      <View style={[styles.container, {backgroundColor: colors.primary}]}>
        <View style={[styles.circle, isDark && {left: 38}]}></View>
        <Icon
          name="sun"
          color={isDark ? GENERAL.white : colors.primary}
          size={15}
        />
        <Icon
          name="moon"
          color={isDark ? colors.primary : GENERAL.white}
          size={15}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 25,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 18,
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: GENERAL.white,
    borderRadius: 50,
    position: 'absolute',
    left: 2,
  },
});

export default SwitchTheme;
