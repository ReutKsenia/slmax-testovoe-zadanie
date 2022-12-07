import {RootState} from '../reduxStore';

const selectAnswersState = (state: RootState) => state.answers;

export const selectAnswers = (state: RootState) =>
  selectAnswersState(state).answers;
