import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note} from './noteReducer';

export interface SingleNoteState {
  note: Note | null;
}

let initialState: SingleNoteState = {
  note: null,
};
const singleNoteSlice = createSlice({
  name: 'singleNoteReducer',
  initialState,
  reducers: {
    setNote: (state, action) => {
      state.note = action.payload;
    },
    addComment: (state, action: PayloadAction<string>) => {
      if (state.note)
        state.note.comments = [action.payload, ...(state.note?.comments || [])];
    },
  },
});
const {actions, reducer} = singleNoteSlice;
export const {setNote, addComment} = actions;

export default reducer;
