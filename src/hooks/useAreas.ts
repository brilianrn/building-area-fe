import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArea } from '../api/DELETE_Area';
import { getAreaDetail } from '../api/GET_AreaDetail';
import { getAreas, GetAreasParams } from '../api/GET_Areas';
import { postArea } from '../api/POST_Area';
import { putArea, PutAreaParams } from '../api/PUT_Area';
import { AreaType } from '../pages/Home/Home.type';
import {
  setAreaDetail,
  setAreasList,
  setIsChangeArea,
} from '../store/actions/areas.action';
import { IRootState } from '../store/reducers';

export const useAreas = () => {
  const [areaError, setAreaError] = useState<boolean>(false);
  const [areaLoading, setAreaLoading] = useState<boolean>(false);
  const [areaMessage, setAreaMessage] = useState<string>();

  const dispatch = useDispatch();
  const { areas } = useSelector((state: IRootState) => state.areas);

  const resetVariablesBuilding = () => {
    setAreaError(false);
    setAreaMessage(undefined);
  };

  const getAreaList = async (payload: GetAreasParams) => {
    setAreaLoading(true);
    try {
      const { data, message, success } = await getAreas(payload);
      if (success) {
        dispatch(
          setAreasList(
            data.map((e) => {
              return {
                ...e,
                isUpdate: false,
              };
            })
          )
        );
        setAreaError(false);
        setAreaMessage(message);
      } else {
        setAreaMessage(message);
        setAreaError(true);
      }
      return setAreaLoading(false);
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  const getDetailArea = async (payload: string) => {
    setAreaLoading(true);
    try {
      const { data, message, success } = await getAreaDetail({ id: payload });
      if (success) {
        dispatch(setAreaDetail(data));
        dispatch(setIsChangeArea(false));
        setAreaError(false);
        setAreaMessage(message);
      } else {
        setAreaMessage(message);
        setAreaError(true);
      }
      return setAreaLoading(false);
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  const removeArea = async (id: string, buildingId: string) => {
    setAreaLoading(true);
    try {
      const { message, success } = await deleteArea({ id });
      if (success) {
        await getAreaList({ buildingId });
        setAreaError(false);
        setAreaMessage(message);
      } else {
        setAreaMessage(message);
        setAreaError(true);
      }
      return setAreaLoading(false);
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  const updateAreas = async (buildingId: string, areaDetail?: AreaType[]) => {
    setAreaLoading(true);
    try {
      const body = areaDetail
        ? areaDetail
        : areas.filter((e: AreaType) => e.isUpdate);
      const { message, success } = await putArea({ body });
      if (success) {
        await getAreaList({ buildingId });
        setAreaError(false);
        setAreaMessage(message);
      } else {
        setAreaMessage(message);
        setAreaError(true);
      }
      return setAreaLoading(false);
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  const createArea = async ({
    data,
    buildingId,
  }: {
    data: AreaType;
    buildingId: string;
  }) => {
    setAreaLoading(true);
    try {
      const { message, success } = await postArea({ body: data });
      if (success) {
        await getAreaList({ buildingId });
        setAreaError(false);
        setAreaMessage(message);
      } else {
        setAreaMessage(message);
        setAreaError(true);
      }
      return setAreaLoading(false);
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  return {
    areaLoading,
    areaError,
    areaMessage,
    resetVariablesBuilding,
    getAreaList,
    getDetailArea,
    updateAreas,
    createArea,
    removeArea,
  };
};
