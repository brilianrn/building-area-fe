import { SET_CONTENTS } from '../../constants';

const initialState = { contents: null };

const contentsReducer = (
  state = initialState,
  actions = {
    type: '',
    payload: null,
  }
) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_CONTENTS:
      return { ...state, contents: payload };
    default:
      return state;
  }
};

export default contentsReducer;
