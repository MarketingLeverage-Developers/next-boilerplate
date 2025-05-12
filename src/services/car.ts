import { config } from '../configs/config';
import { Brand } from '../types/brand';
import { Car } from '../types/car';
import { Request } from '../types/request';
import { Response } from '../types/response';
import apiClient from './apiClient';

export const getSpecialCarList = async () => {
    const response: Response<Car[]> = await apiClient.get(`/client/home/car`, {
        query: { siteUrl: config.server.siteURL },
    });
    return response;
};

export type GetCarPath = {
    id: string;
};

export const getCar = async ({ path }: Request<undefined, undefined, GetCarPath>): Promise<Response<Car>> => {
    if (!path) {
        throw new Error('getCar 호출 시 path가 반드시 필요합니다');
    }
    const { id } = path;
    const response = await apiClient.get<Response<Car>>(`/client/car/${id}`);
    return response;
};

export type GetCarListQuery = {
    [key: string]: string;
    carTypeUuid: string;
    carBrandUuid: string;
    model: string;
};
export const getCarList = async ({ query }: Request<undefined, GetCarListQuery, undefined>) => {
    const response: Response<Car[]> = await apiClient.get(`/client/car`, { query });
    return response;
};

export type GetCarBrandListQuery = {
    [key: string]: string;
    carTypeUuid: string;
    carBrandUuid: string;
};
export const getCarBrandList = async ({ query }: Request<undefined, GetCarBrandListQuery, undefined>) => {
    const response: Response<Brand[]> = await apiClient.get(`/client/car/brand`, { query });
    return response;
};
