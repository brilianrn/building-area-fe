import {
  SET_AREAS,
  SET_AREA_DETAIL,
  SET_IS_CHANGE_AREA,
} from '../../constants';
import { AreaType } from '../../pages/Home/Home.type';

export const setAreasList = (payload: AreaType[]) => {
  return { type: SET_AREAS, payload };
};

export const setAreaDetail = (payload: AreaType) => {
  return { type: SET_AREA_DETAIL, payload };
};

export const setIsChangeArea = (payload: boolean) => {
  return { type: SET_IS_CHANGE_AREA, payload };
};
