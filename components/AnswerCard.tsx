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
import DialogModal from './DialogModal';
import {ThemeContext} from './ThemeProvider';

interface AnswerCardProps {
  answer: Answer;
  comment: Comment;
}
const AnswerCard: FC<AnswerCardProps> = ({answer, comment}) => {
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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, {color: colors.text}]}>{answer.title}</Text>
        <Text style={[styles.text, {color: colors.text}]}>{answer.text}</Text>
        <View style={styles.bottomContainer}>
          <Text style={[styles.date, {color: colors.greyDate}]}>
            {new Date(answer.date).toLocaleString('ru', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}{' '}
            в{' '}
            {new Date(answer.date).toLocaleString('ru', {
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

      <DialogModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title={`Ответить на комментарий "${answer.title}"`}>
        <AddInput addFunc={addAnswerHandler} />
      </DialogModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 11,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 94,
  },
  contentContainer: {
    display: 'flex',
    paddingLeft: 21,
    paddingRight: 7,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 122,
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

export default AnswerCard;
