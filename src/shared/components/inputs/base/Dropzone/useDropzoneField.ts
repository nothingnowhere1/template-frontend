import { useDropzone } from 'react-dropzone';

import type { DropzoneOutputValue, DropzoneProps } from './types';

type DropzoneIsArray<TMaxFiles extends number | undefined> =
    TMaxFiles extends 1 ? false : true;

type DropzoneFieldUiProps =
    | 'label'
    | 'description'
    | 'error'
    | 'inputId'
    | 'className'
    | 'inputClassName'
    | 'dropzoneClassName'
    | 'idleText'
    | 'activeText'
    | 'rejectText';

type UseDropzoneFieldProps<
    TMaxFiles extends number | undefined,
> = Omit<DropzoneProps<TMaxFiles>, DropzoneFieldUiProps>;

const mapFilesToOutput = <
    TMaxFiles extends number | undefined,
>(
        files: Array<File>,
        isArrayValue: DropzoneIsArray<TMaxFiles>
    ): DropzoneOutputValue => {
    return isArrayValue ? files : files.slice(0, 1);
};

const mergeFiles = (
    incomingFiles: Array<File>,
    isArrayValue: boolean,
    maxFiles: number | undefined
): Array<File> => {
    if (!isArrayValue) {
        return incomingFiles.slice(0, 1);
    }

    if (typeof maxFiles === 'number' && maxFiles > 0) {
        return incomingFiles.slice(0, maxFiles);
    }

    return incomingFiles;
};

export function useDropzoneField<
    TMaxFiles extends number | undefined,
>({
    onChange,
    currentFilesCount,
    maxFiles,
    onDrop,
    onDropAccepted,
    onDropRejected,
    ...dropzoneOptions
}: UseDropzoneFieldProps<TMaxFiles>) {
    const isArrayValue = (maxFiles !== 1) as DropzoneIsArray<TMaxFiles>;
    const normalizedExternalCount = Math.max(0, currentFilesCount ?? 0);

    const emitChange = (files: Array<File>) => {
        const output = mapFilesToOutput(files, isArrayValue);
        onChange?.(output);
    };
    const resolvedMaxFiles =
        typeof maxFiles === 'number' && maxFiles > 0
            ? Math.max(maxFiles - normalizedExternalCount, 0)
            : maxFiles;

    const dropzone = useDropzone({
        ...dropzoneOptions,
        multiple: isArrayValue,
        maxFiles: resolvedMaxFiles,
        onDrop: (acceptedFiles, fileRejections, event) => {
            const isOverflow =
                typeof maxFiles === 'number'
                && maxFiles > 0
                && normalizedExternalCount + acceptedFiles.length > maxFiles;

            const nextFiles = mergeFiles(acceptedFiles, isArrayValue, resolvedMaxFiles);
            if (!isOverflow && nextFiles.length > 0) {
                emitChange(nextFiles);
            }

            onDrop?.(nextFiles, fileRejections, event);
            if (!isOverflow && nextFiles.length > 0) {
                onDropAccepted?.(nextFiles, event);
            }
            if (fileRejections.length > 0) {
                onDropRejected?.(fileRejections, event);
            }
        },
    });

    return {
        ...dropzone,
    };
}
