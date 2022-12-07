import {createSlice} from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  text: string;
  date: string;
  comments?: Array<string>;
}
export interface NoteState {
  notes: Array<Note>;
}

let initialState: NoteState = {
  notes: [
    {
      id: '1n',
      title: 'Заголовок',
      text: 'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий представляет собой интересный эксперимент проверки модели развития',
      date: new Date().toString(),
      comments: ['1c', '2c'],
    },
    {
      id: '2n',
      title: 'Заголовок',
      text: 'Краткий текст описание',
      date: new Date().toString(),
    },
  ],
};
const noteSlice = createSlice({
  name: 'noteReducer',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id);
    },
  },
});
const {actions, reducer} = noteSlice;
export const {addNote, removeNote} = actions;

export default reducer;
