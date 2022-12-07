import React, {FC, useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../assets/colors';

interface DeleteButtonProps {
  deleteFunc: Function;
}
const DeleteButton: FC<DeleteButtonProps> = ({deleteFunc}) => {
  const [time, setTime] = useState(5);
  const [timerVisible, setTimerVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (timerVisible) {
      let timerId = setInterval(() => setTime(prev => prev - 1), 1000);
      setIntervalId(timerId);
      let id = setTimeout(() => {
        clearInterval(timerId);
        deleteFunc();
      }, 5000);
      setTimeoutId(id);
    } else {
      setTime(5);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    }
  }, [timerVisible]);

  return (
    <>
      {!timerVisible ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setTimerVisible(true)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.timerButton}
          onPress={() => setTimerVisible(false)}>
          <Text style={styles.timerButtonText}>{time}</Text>
          <Image source={require('../assets/timer.png')} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: colors.active,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 23,
    height: 37,
    color: colors.white,
  },
  deleteButtonText: {
    color: colors.white,
  },
  timerButton: {
    backgroundColor: colors.active,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 37,
    color: colors.white,
  },
  timerButtonText: {
    position: 'absolute',
    color: colors.white,
  },
});

export default DeleteButton;
