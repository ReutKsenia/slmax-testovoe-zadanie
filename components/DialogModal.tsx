import React, {Dispatch, FC, SetStateAction} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../assets/colors';

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
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.background}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={() => {
            setVisible(false);
          }}>
          <View style={styles.modalContainer}>
            {title && <Text style={styles.text}>{title}</Text>}
            {children}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.blurDark,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 28,
    padding: 34,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default DialogModal;
