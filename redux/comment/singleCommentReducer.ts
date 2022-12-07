import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment} from './commentReducer';

export interface SingleCommentState {
  comment: Comment | null;
}

let initialState: SingleCommentState = {
  comment: null,
};
const singleCommentSlice = createSlice({
  name: 'singleCommentReducer',
  initialState,
  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    addAnswer: (state, action: PayloadAction<string>) => {
      if (state.comment)
        state.comment.answers = [
          action.payload,
          ...(state.comment?.answers || []),
        ];
    },
  },
});
const {actions, reducer} = singleCommentSlice;
export const {setComment, addAnswer} = actions;

export default reducer;
