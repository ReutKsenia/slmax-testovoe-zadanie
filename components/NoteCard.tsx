import React, {FC, useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FullNote from './FullNote';
import GestureRecognizer from 'react-native-swipe-gestures';
import DeleteButton from './DeleteButton';
import {useAppDispatch} from '../redux/reduxStore';
import {Note, removeNote} from '../redux/note/noteReducer';
import {Comment} from '../redux/comment/commentReducer';
import {setNote} from '../redux/note/singleNoteReducer';
import {removeComments} from '../redux/comment/commentReducer';
import {removeAnswers} from '../redux/answer/answerReducer';
import Icon from './Icon';
import {ThemeContext} from './ThemeProvider';

interface NoteCardProps {
  note: Note;
  style?: any;
  noteComments?: Array<Comment>;
}
const NoteCard: FC<NoteCardProps> = ({note, style, noteComments}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const {colors, isDark} = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const openHandler = () => {
    setIsOpen(!isOpen);
    dispatch(setNote(note));
  };

  const deleteHandler = () => {
    noteComments?.map(comment => dispatch(removeAnswers(comment.answers)));
    dispatch(removeComments(note?.comments));
    dispatch(removeNote(note));
  };

  return (
    <GestureRecognizer
      onSwipe={() => setDeleteButtonVisible(!deleteButtonVisible)}>
      <View style={style}>
        <View
          style={[
            styles.container,
            {
              borderColor: colors.borderCard,
            },
            isDark && {backgroundColor: colors.borderCard},
          ]}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, {color: colors.text}]}>
              {note.title}
            </Text>
            <View style={[styles.line, {borderRightColor: colors.text}]} />
            <Text style={[styles.text, {color: colors.text}]}>
              {note.text.slice(0, 20)}
              {note.text.length > 20 && '...'}
            </Text>
          </View>
          {deleteButtonVisible ? (
            <DeleteButton deleteFunc={deleteHandler} />
          ) : (
            <TouchableOpacity
              onPress={openHandler}
              style={styles.iconContainer}>
              <Icon name="chevron-down" size={15} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
        {isOpen && <FullNote noteComments={noteComments} note={note} />}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 37,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 17,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 60,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    fontSize: 10,
    fontWeight: '300',
  },
  line: {
    height: 15,
    borderRightWidth: 0.5,
    marginRight: 9,
    marginLeft: 7,
  },
  iconContainer: {
    height: 26,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 17,
  },
});

export default NoteCard;
