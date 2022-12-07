import React, {FC, useContext, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAnswers} from '../redux/answer/answerSelector';
import {Comment, setComment} from '../redux/comment/commentReducer';
import {Note} from '../redux/note/noteReducer';
import {addComment} from '../redux/note/singleNoteReducer';
import {useAppDispatch} from '../redux/reduxStore';
import AddInput from './AddInput';
import CommentCard from './CommentCard';
import DialogModal from './DialogModal';
import {ThemeContext} from './ThemeProvider';

interface FullNoteProps {
  note: Note;
  noteComments?: Array<Comment>;
}
const FullNote: FC<FullNoteProps> = ({note, noteComments}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const answers = useSelector(selectAnswers);
  const {colors, isDark} = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const addCommentHandler = (title: string, text: string) => {
    const newComment = {
      id: Math.random().toString(),
      title,
      text,
      date: new Date().toString(),
      parentId: note.id,
    };
    dispatch(setComment(newComment));
    dispatch(addComment(newComment.id));
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.noteContainer}>
          <Text
            style={[
              styles.date,
              isDark ? {color: colors.text} : {color: colors.greyDate},
            ]}>
            {new Date(note.date).toLocaleString('ru', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
          <Text style={[styles.text, {color: colors.text}]}>{note.text}</Text>
        </View>
      </Pressable>
      {noteComments && noteComments.length > 0 ? (
        noteComments.map(comment => {
          const commentAnswers = answers.filter(i => i.parentId === comment.id);
          return (
            <CommentCard
              comment={comment}
              key={comment.id}
              commentAnswers={commentAnswers}
            />
          );
        })
      ) : (
        <View style={[styles.line, {borderBottomColor: colors.borderCard}]} />
      )}
      <DialogModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title={`Коментировать "${note.title}"`}>
        <AddInput addFunc={addCommentHandler} />
      </DialogModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: Dimensions.get('window').width - 60,
  },
  noteContainer: {
    paddingTop: 10,
    paddingBottom: 27,
    paddingHorizontal: 17,
    width: Dimensions.get('window').width - 60,
  },
  line: {
    borderBottomWidth: 1,
    width: Dimensions.get('window').width - 60,
  },
  date: {
    fontSize: 8,
    fontWeight: '300',
    textAlign: 'right',
    marginBottom: 9,
  },
  text: {
    fontSize: 10,
    fontWeight: '300',
  },
});

export default FullNote;
