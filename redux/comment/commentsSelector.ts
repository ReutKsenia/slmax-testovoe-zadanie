import {RootState} from '../reduxStore';

const selectCommentsState = (state: RootState) => state.comments;
const selectSingleCommentState = (state: RootState) => state.singleComment;

export const selectComments = (state: RootState) =>
  selectCommentsState(state).comments;
export const selectSingleComment = (state: RootState) =>
  selectSingleCommentState(state).comment;
