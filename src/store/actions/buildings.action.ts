import { SET_BUILDINGS, SET_BUILDING_DETAIL } from '../../constants';
import { BuildingType } from '../../pages/Home/Home.type';

export const setBuildingList = (payload: BuildingType[]) => {
  return { type: SET_BUILDINGS, payload };
};

export const setBuildingDetail = (payload: BuildingType) => {
  return { type: SET_BUILDING_DETAIL, payload };
};
