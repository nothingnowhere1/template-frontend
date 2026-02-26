import type React from 'react';

import type { DropzoneProps } from './types';

import type { MediaUploadResult } from '@/shared/queries/media.service';

export type DropzoneCdnValue = Array<MediaUploadResult>;

export type DropzoneCdnUploadItem = {
    localId: string;
    file: File;
    progress: number;
    status: 'uploading' | 'processing' | 'error';
    uploadId?: string;
    fallbackUrl?: string;
    errorMessage?: string;
};

export type DropzoneCdnItemRenderer = (
    item: MediaUploadResult,
    remove: () => void
) => React.ReactNode;

export type DropzoneCdnProps<
    TMaxFiles extends number | undefined = undefined,
> = Omit<DropzoneProps<TMaxFiles>, 'onChange' | 'currentFilesCount'> & {
    value?: DropzoneCdnValue;
    defaultValue?: DropzoneCdnValue;
    onChange?: (value: DropzoneCdnValue) => void;
    showValue?: boolean;
    valueClassName?: string;
    renderValueItem?: DropzoneCdnItemRenderer;
    onUploadProgress?: (file: File, percent: number) => void;
    onUploadError?: (file: File, error: unknown) => void;
};
