import {RootState} from '../reduxStore';

const selectNotesState = (state: RootState) => state.notes;
const selectSingleNoteState = (state: RootState) => state.singleNote;

export const selectNones = (state: RootState) => selectNotesState(state).notes;
export const selectSingleNote = (state: RootState) =>
  selectSingleNoteState(state).note;
