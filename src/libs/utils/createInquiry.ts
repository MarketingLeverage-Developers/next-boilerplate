import { config } from '@/configs/config';
import axios from './axios';

export const createInquiry = async ({
    name,
    firstPhone,
    middlePhone,
    lastPhone,
    inquireLocation,
}: {
    name: string;
    firstPhone: string;
    middlePhone: string;
    location?: string;
    lastPhone: string;
    inquireLocation: string;
}) => {
    const response = await axios.post(
        `/client/inquire`,
        {
            name,
            firstPhone,
            middlePhone,
            lastPhone,
            inquireLocation,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
        },
        { withCredentials: true }
    );
    return response;
};
