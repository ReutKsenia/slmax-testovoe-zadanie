import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {addNote} from '../redux/note/noteReducer';
import {useAppDispatch} from '../redux/reduxStore';
import AddInput from './AddInput';
import {ThemeContext} from './ThemeProvider';

const AddNote = () => {
  const dispatch = useAppDispatch();
  const {colors} = useContext(ThemeContext);

  const addNoteHandler = (title: string, text: string) => {
    const newNote = {
      id: Math.random().toString(),
      title,
      text,
      date: new Date().toString(),
    };
    dispatch(addNote(newNote));
  };

  return (
    <View style={[styles.container, {borderColor: colors.borderCard}]}>
      <AddInput addFunc={addNoteHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 82,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 17,
    marginHorizontal: 30,
    marginBottom: 42,
  },
});

export default AddNote;
