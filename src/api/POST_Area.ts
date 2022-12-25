import { AxiosResponse } from 'axios';
import { AreaType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface PostParamsArea {
  body: AreaType;
}

export interface ResponseSuccessPostArea extends ResponseREST {
  data: AreaType;
}

export const postArea = async ({
  body,
}: PostParamsArea): Promise<ResponseSuccessPostArea> => {
  return axiosInstance
    .post(`/areas`, body)
    .then((res: AxiosResponse<ResponseSuccessPostArea>) => res.data)
    .catch((err) => err.response.data);
};
