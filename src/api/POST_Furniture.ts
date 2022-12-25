import { AxiosResponse } from 'axios';
import { AreaType, FurnituresType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface PostParamsFurniture {
  body: FurnituresType;
}

export interface ResponseSuccessPostFurniture extends ResponseREST {
  data: FurnituresType;
}

export const postFurniture = async ({
  body,
}: PostParamsFurniture): Promise<ResponseSuccessPostFurniture> => {
  return axiosInstance
    .post(`/furnitures`, body)
    .then((res: AxiosResponse<ResponseSuccessPostFurniture>) => res.data)
    .catch((err) => err.response.data);
};
