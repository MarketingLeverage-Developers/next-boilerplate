import { config } from '../configs/config';
import { Banner } from '../types/banner';
import { Request } from '../types/request';
import { Response } from '../types/response';
import apiClient from './apiClient';

export interface GetBannerListQuery {
    // [key: string]: string;
    // siteUrl: string;
}
export const getBannerList = async () => {
    const response: Response<Banner[]> = await apiClient.get(`/client/home/banner`, {
        query: { siteUrl: config.server.siteURL },
    });
    return response;
};
