import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFurniture } from '../api/DELETE_Furniture';
import { getFurnitureDetail } from '../api/GET_FurnitureDetail';
import { getFurnitures, GetFurnituresParams } from '../api/GET_Furnitures';
import { postFurniture } from '../api/POST_Furniture';
import { putFurniture } from '../api/PUT_Furniture';
import { FurnituresType } from '../pages/Home/Home.type';
import {
  setFurnitureDetail,
  setFurnitureList,
  setIsChangeFurniture,
} from '../store/actions/furnitures.action';
import { IRootState } from '../store/reducers';

export const useFurnitures = () => {
  const [furnitureError, setFurnitureError] = useState<boolean>(false);
  const [furnitureLoading, setFurnitureLoading] = useState<boolean>(false);
  const [furnitureMessage, setFurnitureMessage] = useState<string>();

  const dispatch = useDispatch();
  const { furnitures } = useSelector((state: IRootState) => state.furnitures);

  const resetVariablesFurniture = () => {
    setFurnitureError(false);
    setFurnitureMessage(undefined);
  };

  const getFurnitureList = async (buildingId: string) => {
    setFurnitureLoading(true);
    try {
      const res = await getFurnitures({ buildingId });
      if (res?.success) {
        dispatch(setFurnitureList(res.data));
        dispatch(setIsChangeFurniture(false));
        setFurnitureError(false);
        setFurnitureMessage(res?.message);
      } else {
        setFurnitureMessage(res?.message);
        setFurnitureError(true);
      }
      return setFurnitureLoading(false);
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  const getDetailFurniture = async (payload: string) => {
    setFurnitureLoading(true);
    try {
      const { data, message, success } = await getFurnitureDetail({
        id: payload,
      });
      if (success) {
        dispatch(setFurnitureDetail(data));
        dispatch(setIsChangeFurniture(false));
        setFurnitureError(false);
        setFurnitureMessage(message);
      } else {
        setFurnitureMessage(message);
        setFurnitureError(true);
      }
      return setFurnitureLoading(false);
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  const createFurniture = async ({
    data,
    buildingId,
  }: {
    data: FurnituresType;
    buildingId: string;
  }) => {
    setFurnitureLoading(true);
    try {
      const { message, success } = await postFurniture({ body: data });
      if (success) {
        await getFurnitureList(buildingId);
        setFurnitureError(false);
        setFurnitureMessage(message);
      } else {
        setFurnitureMessage(message);
        setFurnitureError(true);
      }
      return setFurnitureLoading(false);
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  const updateFurnitures = async (
    buildingId: string,
    furnitureDetail?: FurnituresType[]
  ) => {
    setFurnitureLoading(true);
    try {
      const body = furnitureDetail
        ? furnitureDetail
        : furnitures.filter((e: FurnituresType) => e.isUpdate);
      const { message, success } = await putFurniture({ body });
      if (success) {
        await getFurnitureList(buildingId);
        setFurnitureError(false);
        setFurnitureMessage(message);
      } else {
        setFurnitureMessage(message);
        setFurnitureError(true);
      }
      return setFurnitureLoading(false);
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  const removeFurniture = async (id: string, buildingId: string) => {
    setFurnitureLoading(true);
    try {
      const { message, success } = await deleteFurniture({ id });
      if (success) {
        await getFurnitureList(buildingId);
        setFurnitureError(false);
        setFurnitureMessage(message);
      } else {
        setFurnitureMessage(message);
        setFurnitureError(true);
      }
      return setFurnitureLoading(false);
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  return {
    furnitureLoading,
    furnitureError,
    furnitureMessage,
    resetVariablesFurniture,
    getFurnitureList,
    createFurniture,
    updateFurnitures,
    getDetailFurniture,
    removeFurniture,
  };
};
