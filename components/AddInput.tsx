import React, {FC, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from './Icon';
import {ThemeContext} from './ThemeProvider';

interface AddInputProps {
  addFunc: Function;
}
const AddInput: FC<AddInputProps> = ({addFunc}) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const {colors} = useContext(ThemeContext);

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
        style={[
          styles.inputTitle,
          {borderBottomColor: colors.borderCard, color: colors.text},
        ]}
        value={title}
        onChangeText={setTitle}
        maxLength={25}
        placeholder="Название"
        placeholderTextColor={colors.text}
      />
      <View style={styles.inputTextContainer}>
        <TextInput
          style={[styles.inputText, {color: colors.text}]}
          value={text}
          onChangeText={setText}
          placeholder="Текст описание"
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={addNoteHandler}>
          <Icon name="chevron-right" size={15} color={colors.text} />
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
    width: Dimensions.get('window').width - 122,
  },
  iconContainer: {
    height: 26,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddInput;
