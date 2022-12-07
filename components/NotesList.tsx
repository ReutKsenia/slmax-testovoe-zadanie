import React, {FC} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import NoteCard from './NoteCard';
import {useSelector} from 'react-redux';
import {selectNones} from '../redux/note/notesSelector';
import {selectComments} from '../redux/comment/commentsSelector';

interface NotesListProps {}
const NotesList: FC<NotesListProps> = ({}) => {
  const notes = useSelector(selectNones);
  const comments = useSelector(selectComments);

  return (
    <View style={styles.container}>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={({item}) => {
            const noteComments = comments?.filter(i => i.parentId === item.id);
            return (
              <NoteCard
                note={item}
                noteComments={noteComments}
                style={{margin: 10}}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>Заметок пока нет</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotesList;
