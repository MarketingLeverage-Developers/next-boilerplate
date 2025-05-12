import { config } from '../configs/config';
import { Request } from '../types/request';
import { Response } from '../types/response';
import { Review } from '../types/review';
import apiClient from './apiClient';

export type GetReviewListQuery = {
    [key: string]: any;
    page: string;
    size: string;
};

export const getReviewList = async ({ query }: Request<undefined, GetReviewListQuery, undefined>) => {
    const response: Response<Review[]> = await apiClient.get(`/client/review`, {
        query: { siteUrl: config.server.siteURL, ...query },
    });
    return response;
};

export type GetReviewPath = {
    id: string;
};

export const getReview = async ({ path }: Request<undefined, undefined, GetReviewPath>): Promise<Response<Review>> => {
    if (!path) {
        throw new Error('getReview 호출 시 path가 반드시 필요합니다');
    }
    const { id } = path;
    const response = await apiClient.get<Response<Review>>(`/client/review/${id}`);
    return response;
};
