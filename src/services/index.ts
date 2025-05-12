import { Request } from '../types/request';
import apiClient from './apiClient';

export type CallHomeQuery = {
    [key: string]: string;
};

export const callHome = async ({ query }: Request<undefined, CallHomeQuery, undefined>): Promise<void> => {
    try {
        await apiClient.get<void>(`/client/home`, { query });
    } catch (e) {
        console.log(e);
    }
};

export type CallPageViewQuery = {
    [key: string]: string;
};

export const callPageView = async ({}: Request<undefined, undefined, undefined>): Promise<void> => {
    try {
        await apiClient.post<void>(`/client/pageView`, {});
    } catch (e) {
        console.log(e);
    }
};
