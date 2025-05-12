import { config } from '../configs/config';
import { Event } from '../types/event';
import { Request } from '../types/request';
import { Response } from '../types/response';
import apiClient from './apiClient';

export type GetEventListQuery = {
    [key: string]: any;
    page: string;
    size: string;
};
export const getEventList = async ({ query }: Request<undefined, GetEventListQuery, undefined>) => {
    const response: Response<Event[]> = await apiClient.get(`/client/event`, {
        query: { siteUrl: config.server.siteURL, ...query },
    });
    return response;
};

export type GetEventPath = {
    id: string;
};

export const getEvent = async ({ path }: Request<undefined, undefined, GetEventPath>): Promise<Response<Event>> => {
    if (!path) {
        throw new Error('getEstimate 호출 시 path가 반드시 필요합니다');
    }
    const { id } = path;
    const response = await apiClient.get<Response<Event>>(`/client/event/${id}`);
    return response;
};
