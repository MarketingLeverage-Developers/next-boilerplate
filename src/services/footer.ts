import { config } from '../configs/config';
import { Footer } from '../types/footer';
import { Response } from '../types/response';
import apiClient from './apiClient';

export const getFooter = async () => {
    const response: Response<Footer> = await apiClient.get(`/client/home/footerInfo`, {
        query: { siteUrl: config.server.siteURL },
    });
    return response;
};
