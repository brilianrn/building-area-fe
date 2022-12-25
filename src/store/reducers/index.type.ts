import {
  AreaType,
  BuildingType,
  FurnituresType,
} from '../../pages/Home/Home.type';

export interface ReducerProps<T extends object> {
  type: string;
  payload?: T;
}

export interface FurnitureState {
  furnitures?: FurnituresType[];
  furniture?: FurnituresType;
  isChangeFurniture: boolean;
}

export interface BuildingState {
  buildings?: BuildingType[];
  building?: BuildingType;
}

export interface AreaState {
  areas?: AreaType[];
  area?: AreaType;
  isChangeArea: boolean;
}
