import { AxiosResponse } from 'axios';
import { FurnituresType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface GetFurnitureDetailParams {
  id: string;
}

export interface ResponseSuccessGetFurnitureDetail extends ResponseREST {
  data: FurnituresType;
}

export const getFurnitureDetail = async ({
  id,
}: GetFurnitureDetailParams): Promise<ResponseSuccessGetFurnitureDetail> => {
  return axiosInstance
    .get(`/furnitures/detail/${id}`)
    .then((res: AxiosResponse<ResponseSuccessGetFurnitureDetail>) => res.data)
    .catch((err) => err.response.data);
};
