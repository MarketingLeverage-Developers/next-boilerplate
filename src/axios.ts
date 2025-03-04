// src/api/axiosConfig.ts
import axios from 'axios';

// NEXT_PUBLIC_API_URL 환경변수에 API 기본 URL을 설정해두었다고 가정합니다.
// 만약 환경변수가 설정되어 있지 않으면 기본값으로 '/api'를 사용합니다.
const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    (config) => {
        // 예를 들어, 인증 토큰을 추가할 수 있습니다.
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 에러 처리 (예: 401, 500 등)
        return Promise.reject(error);
    }
);

export default axiosInstance;
