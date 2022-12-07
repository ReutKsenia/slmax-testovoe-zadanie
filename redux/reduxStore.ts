import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import noteReducer from './note/noteReducer';
import singleNoteReducer from './note/singleNoteReducer';
import commentReducer from './comment/commentReducer';
import singleCommentReducer from './comment/singleCommentReducer';
import answerReducer from './answer/answerReducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  singleNote: singleNoteReducer,
  comments: commentReducer,
  singleComment: singleCommentReducer,
  answers: answerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
