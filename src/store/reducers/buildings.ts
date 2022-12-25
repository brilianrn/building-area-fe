import { SET_BUILDINGS, SET_BUILDING_DETAIL } from '../../constants';
import { BuildingState } from './index.type';

const initialState: BuildingState = {
  buildings: undefined,
  building: undefined,
};

const buildingReducer = (
  state = initialState,
  actions = {
    type: '',
    payload: undefined,
  }
) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_BUILDINGS:
      return { ...state, buildings: payload };
    case SET_BUILDING_DETAIL:
      return { ...state, building: payload };
    default:
      return state;
  }
};

export default buildingReducer;
