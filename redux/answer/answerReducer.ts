import {createSlice} from '@reduxjs/toolkit';

export interface Answer {
  id: string;
  parentId: string;
  title: string;
  text: string;
  date: string;
}
export interface AnswerState {
  answers: Array<Answer>;
}

let initialState: AnswerState = {
  answers: [
    {
      id: '1a',
      parentId: '1c',
      title: 'Ответ на комментарий',
      text: 'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий представляет собой интересный эксперимент проверки модели развития',
      date: new Date().toString(),
    },
    {
      id: '2a',
      parentId: '1c',
      title: 'Заголовок',
      text: 'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий представляет собой интересный эксперимент проверки модели развития',
      date: new Date().toString(),
    },
  ],
};
const answerSlice = createSlice({
  name: 'answerReducer',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.answers = [action.payload, ...state.answers];
    },
    removeAnswers: (state, action) => {
      action.payload?.answers.map(
        (i: any) =>
          (state.answers = state.answers.filter(answer => answer.id !== i)),
      );
    },
  },
});
const {actions, reducer} = answerSlice;
export const {setAnswer, removeAnswers} = actions;

export default reducer;
