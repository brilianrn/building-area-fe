import {
  SET_FURNITURES,
  SET_FURNITURE_DETAIL,
  SET_IS_CHANGE_FURNITURE,
} from '../../constants';
import { FurnitureState } from './index.type';

const initialState: FurnitureState = {
  furnitures: undefined,
  furniture: undefined,
  isChangeFurniture: false,
};

const furnituresReducer = (
  state = initialState,
  actions = {
    type: '',
    payload: undefined,
  }
) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_FURNITURES:
      return { ...state, furnitures: payload };
    case SET_FURNITURE_DETAIL:
      return { ...state, furniture: payload };
    case SET_IS_CHANGE_FURNITURE:
      return { ...state, isChangeFurniture: payload };
    default:
      return state;
  }
};

export default furnituresReducer;
