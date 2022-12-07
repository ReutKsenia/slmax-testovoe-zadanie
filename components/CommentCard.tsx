import React, {FC, useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Answer, setAnswer} from '../redux/answer/answerReducer';
import {Comment} from '../redux/comment/commentReducer';
import {addAnswer, setComment} from '../redux/comment/singleCommentReducer';
import {useAppDispatch} from '../redux/reduxStore';
import AddInput from './AddInput';
import AnswersList from './AnswersList';
import DialogModal from './DialogModal';
import {ThemeContext} from './ThemeProvider';

interface CommentProps {
  comment: Comment;
  commentAnswers?: Array<Answer>;
}
const CommentCard: FC<CommentProps> = ({comment, commentAnswers}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    setModalVisible(true);
    dispatch(setComment(comment));
  };

  const addAnswerHandler = (title: string, text: string) => {
    const newAnswer = {
      id: Math.random().toString(),
      title,
      text,
      date: new Date().toString(),
      parentId: comment.id,
    };
    dispatch(setAnswer(newAnswer));
    dispatch(addAnswer(newAnswer.id));
    setModalVisible(false);
  };
  return (
    <View>
      <View style={[styles.container, {borderColor: colors.borderComment}]}>
        <Text style={[styles.title, {color: colors.text}]}>
          {comment.title}
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>{comment.text}</Text>
        <View style={styles.bottomContainer}>
          <Text style={[styles.date, {color: colors.greyDate}]}>
            {new Date(comment.date).toLocaleString('ru', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}{' '}
            в{' '}
            {new Date(comment.date).toLocaleString('ru', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
          <TouchableOpacity onPress={openModalHandler}>
            <Text
              style={[
                styles.date,
                {fontWeight: '600', color: colors.greyDate},
              ]}>
              Ответить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {commentAnswers && (
        <AnswersList answers={commentAnswers} comment={comment} />
      )}

      <DialogModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title={`Ответить на комментарий "${comment.title}"`}>
        <AddInput addFunc={addAnswerHandler} />
      </DialogModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 5,
    padding: 11,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 94,
    marginBottom: 10,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    fontSize: 8,
    fontWeight: '300',
    marginBottom: 5,
  },
  date: {
    fontSize: 7,
    fontWeight: '300',
    marginRight: 10,
  },
});

export default CommentCard;
