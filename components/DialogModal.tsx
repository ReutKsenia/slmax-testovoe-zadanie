import React, {Dispatch, FC, SetStateAction, useContext} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {GENERAL} from '../assets/colors';
import {ThemeContext} from './ThemeProvider';

interface DialogModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
}

const DialogModal: FC<DialogModalProps> = ({
  visible,
  setVisible,
  title,
  children,
}) => {
  const {colors} = useContext(ThemeContext);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{flex: 1, backgroundColor: colors.blurDark}}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={() => {
            setVisible(false);
          }}>
          <View
            style={[
              styles.modalContainer,
              {backgroundColor: colors.background},
            ]}>
            {title && (
              <Text style={[styles.text, {color: colors.text}]}>{title}</Text>
            )}
            {children}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 5,
    margin: 28,
    padding: 34,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default DialogModal;
