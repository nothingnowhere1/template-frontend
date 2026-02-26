import { axiosInstanceMedia } from '@/shared/queries/api';

export type UploadStatus = {
    id: string;
    progress: number;
    status: 'uploading' | 'processing';
} | {
    id: string;
    status: 'error';
    message: string;
} | {
    id: string;
    url: string;
    status: 'success';
};

export type MediaUploadResult = {
    id: string
    url: string;
};

export async function apiMediaUploadFile(file: File, onUploadProgress?: (percent: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    return axiosInstanceMedia.post<MediaUploadResult>('/upload', formData, {
        withCredentials: false,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.total ?? progressEvent.bytes;
            if (!totalLength) {
                return;
            }
            const currentProgress = Math.round((progressEvent.loaded * 100) / totalLength);
            onUploadProgress?.(Math.min(100, Math.max(0, currentProgress)));
        }
    });

}

export async function apiMediaGetUploadStatus(id: string) {
    if (id[0] === '/') id = id.slice(1);

    const { data } = await axiosInstanceMedia.get<UploadStatus>(`/upload/${id}`, {
        withCredentials: false,
    });

    return data;
}
