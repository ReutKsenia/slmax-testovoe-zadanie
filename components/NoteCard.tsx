import React, {FC, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FullNote from './FullNote';
import GestureRecognizer from 'react-native-swipe-gestures';
import DeleteButton from './DeleteButton';
import colors from '../assets/colors';
import {useAppDispatch} from '../redux/reduxStore';
import {Note, removeNote} from '../redux/note/noteReducer';
import {Comment} from '../redux/comment/commentReducer';
import {setNote} from '../redux/note/singleNoteReducer';
import {removeComments} from '../redux/comment/commentReducer';
import {removeAnswers} from '../redux/answer/answerReducer';

interface NoteCardProps {
  note: Note;
  style?: any;
  noteComments?: Array<Comment>;
}
const NoteCard: FC<NoteCardProps> = ({note, style, noteComments}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
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
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{note.title}</Text>
            <View style={styles.line} />
            <Text style={styles.text}>
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
              <Image
                source={require('../assets/arrow.png')}
                style={isOpen ? styles.icon : {marginRight: 17}}
              />
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
    borderColor: colors.borderCard,
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
    color: colors.black,
  },
  text: {
    fontSize: 10,
    fontWeight: '300',
    color: colors.black,
  },
  line: {
    height: 15,
    borderRightWidth: 0.5,
    borderBottomColor: colors.black,
    marginRight: 9,
    marginLeft: 7,
  },
  icon: {
    transform: [{rotate: '180deg'}],
    marginRight: 17,
  },
  iconContainer: {
    height: 26,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteCard;
