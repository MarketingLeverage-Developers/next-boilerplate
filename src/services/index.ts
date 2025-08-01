import { Request } from '../types/request';
import apiClient from './apiClient';

export type CallHomeQuery = {
    [key: string]: string;
};

export interface CallHomeBody {
    visitorId: string;
    docReferer: string;
}

export const callHome = async ({ query, body }: Request<CallHomeBody, CallHomeQuery, undefined>): Promise<void> => {
    try {
        await apiClient.post<void>('/client/home', {
            query,
            body,
        });
    } catch (e) {
        console.error('callHome 실패', e);
    }
};

export type CallPageViewQuery = {
    [key: string]: string;
};

export interface CallPageeBody {
    visitorId: string;
}

export const callPageView = async ({ body }: Request<CallPageeBody, undefined, undefined>): Promise<void> => {
    try {
        await apiClient.post<void>(`/client/pageView`, {
            body,
        });
    } catch (e) {
        console.log(e);
    }
};

export interface CallPageStayBody {
    siteUrl: string;
    entryTime: string;
    exitTime: string;
    visitorId: string;
}

type CallPageStayRequest = Request<CallPageStayBody>;

export const callPageStay = async ({ body }: CallPageStayRequest) => {
    try {
        await apiClient.post<void>(`/client/pageStay`, { body: { ...body } });
    } catch (e) {
        console.log(e);
    }
};
