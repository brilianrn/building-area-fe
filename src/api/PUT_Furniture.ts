import { AxiosResponse } from 'axios';
import { FurnituresType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface PutFurnitureParams {
  body: FurnituresType[];
}

export interface ResponseSuccessPutFurniture extends ResponseREST {
  data: number[];
}

export const putFurniture = async ({
  body,
}: PutFurnitureParams): Promise<ResponseSuccessPutFurniture> => {
  return axiosInstance
    .put(`/furnitures`, body)
    .then((res: AxiosResponse<ResponseSuccessPutFurniture>) => res.data)
    .catch((err) => err.response.data);
};
