import {
  SET_FURNITURES,
  SET_FURNITURE_DETAIL,
  SET_IS_CHANGE_FURNITURE,
} from '../../constants';
import { FurnituresType } from '../../pages/Home/Home.type';

export const setFurnitureList = (payload: FurnituresType[]) => {
  return { type: SET_FURNITURES, payload };
};

export const setFurnitureDetail = (payload: FurnituresType) => {
  return { type: SET_FURNITURE_DETAIL, payload };
};

export const setIsChangeFurniture = (payload: boolean) => {
  return { type: SET_IS_CHANGE_FURNITURE, payload };
};
