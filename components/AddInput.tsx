import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import colors from '../assets/colors';

interface AddInputProps {
  addFunc: Function;
}
const AddInput: FC<AddInputProps> = ({addFunc}) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const addNoteHandler = () => {
    if (title.trim().length > 0 && text.trim().length > 0) {
      addFunc(title, text);
    }
    setTitle('');
    setText('');
  };

  return (
    <View>
      <TextInput
        style={styles.inputTitle}
        value={title}
        onChangeText={setTitle}
        maxLength={25}
        placeholder="Название"
        placeholderTextColor={colors.black}
      />
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.inputText}
          value={text}
          onChangeText={setText}
          placeholder="Текст описание"
          placeholderTextColor={colors.black}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={addNoteHandler}>
          <Image source={require('../assets/arrow.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    height: 30,
    borderBottomWidth: 1,
    padding: 7,
    fontSize: 14,
    fontWeight: '600',
    borderBottomColor: colors.borderCard,
    width: Dimensions.get('window').width - 94,
    marginTop: 8,
  },
  inputTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    height: 40,
    fontSize: 10,
    fontWeight: '300',
    color: colors.black,
    width: Dimensions.get('window').width - 122,
  },
  iconContainer: {
    height: 26,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    transform: [{rotate: '-90deg'}],
  },
});

export default AddInput;
