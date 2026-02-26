import { useCallback, useMemo, useState } from 'react';

import type { DropzoneCdnUploadItem } from '../DropzoneCdn.types';

import { apiMediaUploadFile } from '@/shared/queries/media.service';
import { generateId } from '@/shared';

type UseDropzoneCdnUploadsParams = {
    onUploadProgress?: (file: File, percent: number) => void;
    onUploadError?: (file: File, error: unknown) => void;
};

const isUploadActive = (item: DropzoneCdnUploadItem) =>
    item.status === 'uploading' || item.status === 'processing';

const resolveUploadErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Не удалось загрузить файл.';

export function useDropzoneCdnUploads({
    onUploadProgress,
    onUploadError,
}: UseDropzoneCdnUploadsParams) {
    const [uploadItems, setUploadItems] = useState<Array<DropzoneCdnUploadItem>>([]);

    const updateUploadItem = useCallback((
        localId: string,
        updater: (item: DropzoneCdnUploadItem) => DropzoneCdnUploadItem
    ) => {
        setUploadItems((prevItems) => prevItems.map((item) => {
            if (item.localId !== localId) {
                return item;
            }

            return updater(item);
        }));
    }, []);

    const removeUploadItem = useCallback((localId: string) => {
        setUploadItems((prevItems) => prevItems.filter((item) => item.localId !== localId));
    }, []);

    const startSingleUpload = useCallback(async (file: File) => {
        const localId = generateId();
        setUploadItems((prevItems) => [
            ...prevItems,
            {
                localId,
                file,
                progress: 0,
                status: 'uploading',
            },
        ]);

        try {
            const response = await apiMediaUploadFile(file, (percent) => {
                onUploadProgress?.(file, percent);
                updateUploadItem(localId, (item) => ({
                    ...item,
                    status: 'uploading',
                    progress: percent,
                }));
            });

            updateUploadItem(localId, (item) => ({
                ...item,
                status: 'processing',
                progress: 100,
                uploadId: response.data.id,
                fallbackUrl: response.data.url,
            }));
        } catch (error) {
            onUploadError?.(file, error);
            updateUploadItem(localId, (item) => ({
                ...item,
                status: 'error',
                errorMessage: resolveUploadErrorMessage(error),
            }));
        }
    }, [onUploadError, onUploadProgress, updateUploadItem]);

    const startUploads = useCallback((files: Array<File>) => {
        files.forEach((file) => {
            void startSingleUpload(file);
        });
    }, [startSingleUpload]);

    const activeUploadsCount = useMemo(
        () => uploadItems.filter(isUploadActive).length,
        [uploadItems]
    );

    return {
        uploadItems,
        activeUploadsCount,
        startUploads,
        removeUploadItem,
        updateUploadItem,
    };
}
