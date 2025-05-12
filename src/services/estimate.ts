import { config } from '../configs/config';
import { Estimate } from '../types/estimate';
import { Request } from '../types/request';
import { Response } from '../types/response';
import apiClient from './apiClient';

export type GetEstimatePath = {
    id: string;
};

export const getEstimate = async ({
    path,
}: Request<undefined, undefined, GetEstimatePath>): Promise<Response<Estimate>> => {
    if (!path) {
        throw new Error('getEstimate 호출 시 path가 반드시 필요합니다');
    }
    const { id } = path;
    const response = await apiClient.get<Response<Estimate>>(`/client/estimate/${id}`);
    return response;
};

export type GetEstimateListQuery = {
    [key: string]: string;
};
export const getEstimateList = async ({ query }: Request<undefined, GetEstimateListQuery, undefined>) => {
    const response: Response<Estimate[]> = await apiClient.get(`/client/estimate`, {
        query: { siteUrl: config.server.siteURL, ...query },
    });
    return response;
};
