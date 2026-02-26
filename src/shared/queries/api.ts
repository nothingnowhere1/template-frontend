import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { MEDIA_CONFIG } from '@/shared/constants';

export const axiosInstanceMedia: AxiosInstance = axios.create({
    withCredentials: false,
    baseURL: MEDIA_CONFIG.MEDIA_API_URL,
    timeout: 30000,
    paramsSerializer: {
        indexes: null
    }
});
