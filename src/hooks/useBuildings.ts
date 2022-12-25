import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBuildings } from '../api/GET_Buildings';
import { postBuilding } from '../api/POST_Building';
import { BuildingType } from '../pages/Home/Home.type';
import { setBuildingList } from '../store/actions/buildings.action';

export const useBuildings = () => {
  const [buildingError, setBuildingError] = useState<boolean>(false);
  const [buildingLoading, setBuildingLoading] = useState<boolean>(false);
  const [buildingMessage, setBuildingMessage] = useState<string>();
  const dispatch = useDispatch();

  const resetVariablesBuilding = () => {
    setBuildingError(false);
    setBuildingMessage(undefined);
  };

  const getBuildingList = async () => {
    setBuildingLoading(true);
    try {
      const { data, message, success } = await getBuildings();
      if (success) {
        dispatch(setBuildingList(data));
        setBuildingError(false);
        setBuildingMessage(message);
      } else {
        setBuildingMessage(message);
        setBuildingError(true);
      }
      return setBuildingLoading(false);
    } catch (err) {
      setBuildingLoading(false);
      return err;
    }
  };

  const createBuilding = async (payload: BuildingType) => {
    setBuildingLoading(true);
    try {
      const { message, success } = await postBuilding({ body: payload });
      if (success) {
        await getBuildingList();
        setBuildingError(false);
        setBuildingMessage(message);
      } else {
        setBuildingMessage(message);
        setBuildingError(true);
      }
      return setBuildingLoading(false);
    } catch (err) {
      setBuildingLoading(false);
      return err;
    }
  };

  return {
    buildingLoading,
    buildingError,
    buildingMessage,
    resetVariablesBuilding,
    getBuildingList,
    createBuilding,
  };
};
