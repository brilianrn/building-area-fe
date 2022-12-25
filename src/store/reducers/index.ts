/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from 'redux';
import furnituresReducer from './furnitures';
import buildingReducer from './buildings';
import areaReducer from './areas';

const rootReducer = combineReducers({
  furnitures: furnituresReducer,
  buildings: buildingReducer,
  areas: areaReducer,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
