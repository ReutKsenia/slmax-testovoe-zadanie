import React, {FC, useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {GENERAL} from '../assets/colors';
import Icon from './Icon';

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
          <Icon name="rotate-ccw" size={30} color={GENERAL.white} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: GENERAL.active,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 23,
    height: 37,
    color: GENERAL.white,
  },
  deleteButtonText: {
    color: GENERAL.white,
  },
  timerButton: {
    backgroundColor: GENERAL.active,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 37,
    color: GENERAL.white,
  },
  timerButtonText: {
    position: 'absolute',
    color: GENERAL.white,
  },
});

export default DeleteButton;
