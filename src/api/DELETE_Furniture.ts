import { AxiosResponse } from 'axios';
import { FurnituresType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface DeleteFurnitureParams {
  id: string;
}

export interface ResponseSuccessDeleteFurniture extends ResponseREST {
  data: FurnituresType;
}

export const deleteFurniture = async ({
  id,
}: DeleteFurnitureParams): Promise<ResponseSuccessDeleteFurniture> => {
  return axiosInstance
    .delete(`/furnitures/${id}`)
    .then((res: AxiosResponse<ResponseSuccessDeleteFurniture>) => res.data)
    .catch((err) => err.response.data);
};
