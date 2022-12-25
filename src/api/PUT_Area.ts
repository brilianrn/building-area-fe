import { AxiosResponse } from 'axios';
import { AreaType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface PutAreaParams {
  body: AreaType[];
}

export interface ResponseSuccessPutArea extends ResponseREST {
  data: number[];
}

export const putArea = async ({
  body,
}: PutAreaParams): Promise<ResponseSuccessPutArea> => {
  return axiosInstance
    .put(`/areas`, body)
    .then((res: AxiosResponse<ResponseSuccessPutArea>) => res.data)
    .catch((err) => err.response.data);
};
