import axiosInstance from '@/axios';

export const blockIp = async () => {
    const response = await axiosInstance.get('/client/blockIp', {
        params: {
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
        },
        withCredentials: true,
    });
    return response; // 혹은 response.data 만 리턴해도 됨
};
