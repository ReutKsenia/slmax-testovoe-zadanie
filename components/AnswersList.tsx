import React, {FC, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Comment} from '../redux/comment/commentReducer';
import AnswerCard from './AnswerCard';
import {Answer} from '../redux/answer/answerReducer';
import colors from '../assets/colors';

interface AnswersListProps {
  comment: Comment;
  answers: Array<Answer>;
}
const AnswersList: FC<AnswersListProps> = ({comment, answers}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      <View style={styles.container}>
        {answers.length > 1 && !showMore ? (
          <AnswerCard comment={comment} answer={answers[0]} />
        ) : (
          answers.map(answer => {
            return (
              <AnswerCard comment={comment} answer={answer} key={answer.id} />
            );
          })
        )}
      </View>
      {answers.length > 1 && !showMore ? (
        <TouchableOpacity
          style={styles.showMoreContainer}
          onPress={() => setShowMore(true)}>
          <Text style={styles.showMoreText}>–– Показать все ответы</Text>
        </TouchableOpacity>
      ) : showMore ? (
        <TouchableOpacity
          style={styles.showMoreContainer}
          onPress={() => setShowMore(false)}>
          <Text style={styles.showMoreText}>–– Скрыть ответы</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreText: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.greyDate,
  },
  showMoreContainer: {
    marginBottom: 10,
    marginLeft: 17,
  },
});

export default AnswersList;
