import {createSlice} from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  parentId: string;
  title: string;
  text: string;
  date: string;
  answers?: Array<string>;
}
export interface CommentState {
  comments: Array<Comment>;
}

let initialState: CommentState = {
  comments: [
    {
      id: '1c',
      parentId: '1n',
      title: 'Название комментария',
      text: 'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий представляет собой интересный эксперимент проверки модели развития',
      date: new Date().toString(),
    },
    {
      id: '2c',
      parentId: '1n',
      title: 'Заголовок',
      text: 'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий представляет собой интересный эксперимент проверки модели развития',
      date: new Date().toString(),
    },
  ],
};
const noteSlice = createSlice({
  name: 'answerReducer',
  initialState,
  reducers: {
    setComment: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    removeComments: (state, action) => {
      action.payload?.comments?.map(
        (i: any) =>
          (state.comments = state.comments.filter(comment => comment.id !== i)),
      );
    },
  },
});
const {actions, reducer} = noteSlice;
export const {setComment, removeComments} = actions;

export default reducer;
