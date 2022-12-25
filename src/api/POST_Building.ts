import { AxiosResponse } from 'axios';
import { BuildingType } from '../pages/Home/Home.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface PostParamsBuilding {
  body: BuildingType;
}

export interface ResponseSuccessPostBuilding extends ResponseREST {
  data: BuildingType;
}

export const postBuilding = async ({
  body,
}: PostParamsBuilding): Promise<ResponseSuccessPostBuilding> => {
  return axiosInstance
    .post(`/buildings`, body)
    .then((res: AxiosResponse<ResponseSuccessPostBuilding>) => res.data)
    .catch((err) => err.response.data);
};
