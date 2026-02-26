import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { DropzoneCdnUploadItem } from '../DropzoneCdn.types';

import type { MediaUploadResult } from '@/shared/queries/media.service';
import { apiMediaGetUploadStatus } from '@/shared/queries/media.service';

const POLL_INTERVAL_MS = 1500;

type UseDropzoneCdnPollingParams = {
    uploadItems: Array<DropzoneCdnUploadItem>;
    appendUploadedValue: (result: MediaUploadResult) => void;
    removeUploadItem: (localId: string) => void;
    updateUploadItem: (
        localId: string,
        updater: (item: DropzoneCdnUploadItem) => DropzoneCdnUploadItem
    ) => void;
    onUploadError?: (file: File, error: unknown) => void;
};

export function useDropzoneCdnPolling({
    uploadItems,
    appendUploadedValue,
    removeUploadItem,
    updateUploadItem,
    onUploadError,
}: UseDropzoneCdnPollingParams) {
    const uploadItemsRef = useRef<Array<DropzoneCdnUploadItem>>(uploadItems);

    useEffect(() => {
        uploadItemsRef.current = uploadItems;
    }, [uploadItems]);

    const pollSingleUpload = useCallback(async (item: DropzoneCdnUploadItem) => {
        if (!item.uploadId || item.status === 'error') {
            return;
        }

        try {
            const status = await apiMediaGetUploadStatus(item.uploadId);

            if (status.status === 'success') {
                appendUploadedValue({
                    id: status.id,
                    url: status.url || item.fallbackUrl || '',
                });
                removeUploadItem(item.localId);
                return;
            }

            if (status.status === 'error') {
                onUploadError?.(item.file, new Error(status.message || 'Ошибка обработки файла.'));
                updateUploadItem(item.localId, (currentItem) => ({
                    ...currentItem,
                    status: 'error',
                    errorMessage: status.message || 'Ошибка обработки файла.',
                }));
                return;
            }

            updateUploadItem(item.localId, (currentItem) => ({
                ...currentItem,
                status: status.status,
                progress: Math.min(100, Math.max(0, status.progress)),
            }));
        } catch {
            // Keep last known state and retry on next tick.
        }
    }, [appendUploadedValue, onUploadError, removeUploadItem, updateUploadItem]);

    const pollUploadStatuses = useCallback(() => {
        const pollingItems = uploadItemsRef.current.filter((item) => !!item.uploadId && item.status !== 'error');
        if (!pollingItems.length) {
            return;
        }

        pollingItems.forEach((item) => {
            void pollSingleUpload(item);
        });
    }, [pollSingleUpload]);

    const hasPollingItems = useMemo(
        () => uploadItems.some((item) => !!item.uploadId && item.status !== 'error'),
        [uploadItems]
    );

    useEffect(() => {
        if (!hasPollingItems) {
            return;
        }

        const intervalId = setInterval(() => {
            pollUploadStatuses();
        }, POLL_INTERVAL_MS);

        pollUploadStatuses();

        return () => {
            clearInterval(intervalId);
        };
    }, [hasPollingItems, pollUploadStatuses]);
}
