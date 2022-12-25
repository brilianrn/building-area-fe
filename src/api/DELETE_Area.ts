import { AxiosResponse } from 'axios';
import { AreaType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface DeleteAreaParams {
  id: string;
}

export interface ResponseSuccessDeleteArea extends ResponseREST {
  data: AreaType;
}

export const deleteArea = async ({
  id,
}: DeleteAreaParams): Promise<ResponseSuccessDeleteArea> => {
  return axiosInstance
    .delete(`/areas/${id}`)
    .then((res: AxiosResponse<ResponseSuccessDeleteArea>) => res.data)
    .catch((err) => err.response.data);
};
