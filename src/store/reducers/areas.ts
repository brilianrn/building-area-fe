import {
  SET_AREAS,
  SET_AREA_DETAIL,
  SET_IS_CHANGE_AREA,
} from '../../constants';
import { AreaState } from './index.type';

const initialState: AreaState = {
  areas: undefined,
  area: undefined,
  isChangeArea: false,
};

const areaReducer = (
  state = initialState,
  actions = {
    type: '',
    payload: undefined,
  }
) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_AREAS:
      return { ...state, areas: payload };
    case SET_AREA_DETAIL:
      return { ...state, area: payload };
    case SET_IS_CHANGE_AREA:
      return { ...state, isChangeArea: payload };
    default:
      return state;
  }
};

export default areaReducer;
