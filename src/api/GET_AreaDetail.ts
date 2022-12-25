import { AxiosResponse } from 'axios';
import { AreaType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface GetAreaDetailParams {
  id: string;
}

export interface ResponseSuccessGetAreaDetail extends ResponseREST {
  data: AreaType;
}

export const getAreaDetail = async ({
  id,
}: GetAreaDetailParams): Promise<ResponseSuccessGetAreaDetail> => {
  return axiosInstance
    .get(`/areas/detail/${id}`)
    .then((res: AxiosResponse<ResponseSuccessGetAreaDetail>) => res.data)
    .catch((err) => err.response.data);
};
