import { useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import type { DropzoneInputValue, DropzoneOutputValue, DropzoneProps, DropzoneValueType, FilePreview, } from './types';

import { arrayify, base64ToFile, fileToBase64 } from '@/shared';

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
    | 'rejectText'
    | 'showFiles'
    | 'renderFile';

type UseDropzoneFieldProps<
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
> = Omit<DropzoneProps<TValueType, TMaxFiles>, DropzoneFieldUiProps>;

const normalizeToFiles = <
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
>(
        value: DropzoneInputValue<TValueType, TMaxFiles>
    ): Array<File> => {
    const items = arrayify(value);

    return items.reduce<Array<File>>((acc, item, index) => {
        if (item instanceof File) {
            acc.push(item);
            return acc;
        }

        if (typeof item === 'string') {
            const file = base64ToFile(item, index);
            if (file) {
                acc.push(file);
            }
        }

        return acc;
    }, []);
};

const mapFilesToOutput = async <
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
>(
    files: Array<File>,
    valueType: TValueType,
    isArrayValue: DropzoneIsArray<TMaxFiles>
): Promise<DropzoneOutputValue<TValueType, TMaxFiles>> => {
    if (valueType === 'file') {
        return (isArrayValue ? files : (files[0] ?? null)) as DropzoneOutputValue<TValueType, TMaxFiles>;
    }

    const encoded = await Promise.all(files.map((file) => fileToBase64(file)));
    return (isArrayValue ? encoded : (encoded[0] ?? null)) as DropzoneOutputValue<TValueType, TMaxFiles>;
};

const mergeFiles = <
    TMaxFiles extends number | undefined,
>(
        currentFiles: Array<File>,
        incomingFiles: Array<File>,
        isArrayValue: DropzoneIsArray<TMaxFiles>,
        maxFiles: TMaxFiles
    ): Array<File> => {
    if (!isArrayValue) {
        return incomingFiles.slice(0, 1);
    }

    const merged = [...currentFiles, ...incomingFiles];
    if (typeof maxFiles === 'number' && maxFiles > 0) {
        return merged.slice(0, maxFiles);
    }

    return merged;
};

const createPreviewId = () =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function useDropzoneField<
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
>({
    valueType,
    value,
    defaultValue,
    onChange,
    maxFiles,
    onDrop,
    onDropAccepted,
    onDropRejected,
    ...dropzoneOptions
}: UseDropzoneFieldProps<TValueType, TMaxFiles>) {
    const isControlled = value !== undefined;
    const [innerFiles, setInnerFiles] = useState<Array<File>>([]);
    const [controlledFiles, setControlledFiles] = useState<Array<File>>([]);
    const [maxFilesError, setMaxFilesError] = useState<string | null>(null);
    const previewIdsRef = useRef<WeakMap<File, string>>(new WeakMap());
    const isArrayValue = (maxFiles !== 1) as DropzoneIsArray<TMaxFiles>;
    const resolvedValueType = (valueType ?? 'file') as TValueType;

    useEffect(() => {
        if (!isControlled) {
            return;
        }

        setControlledFiles(normalizeToFiles(value));
    }, [isControlled, value]);

    useEffect(() => {
        if (isControlled) {
            return;
        }

        setInnerFiles(normalizeToFiles(defaultValue));
    }, [defaultValue, isControlled]);

    const selectedFiles = useMemo(
        () => (isControlled ? controlledFiles : innerFiles),
        [isControlled, controlledFiles, innerFiles]
    );

    const getPreviewId = (file: File) => {
        const existingId = previewIdsRef.current.get(file);
        if (existingId) {
            return existingId;
        }

        const nextId = createPreviewId();
        previewIdsRef.current.set(file, nextId);
        return nextId;
    };

    const filePreviews = useMemo<Array<FilePreview>>(
        () =>
            selectedFiles.map((file) => ({
                id: getPreviewId(file),
                file,
                isImage: file.type.startsWith('image/'),
                url: URL.createObjectURL(file),
            })),
        [selectedFiles]
    );

    useEffect(() => () => {
        filePreviews.forEach((item) => URL.revokeObjectURL(item.url));
    }, [filePreviews]);

    const emitChange = (files: Array<File>) => {
        void mapFilesToOutput(files, resolvedValueType, isArrayValue).then((output) => {
            onChange?.(output);
        });
    };

    const removeFile = (index: number) => () => {
        const nextFiles = selectedFiles.filter((_, fileIndex) => fileIndex !== index);

        if (!isControlled) {
            setInnerFiles(nextFiles);
        }

        setMaxFilesError(null);
        emitChange(nextFiles);
    };

    const dropzone = useDropzone({
        ...dropzoneOptions,
        multiple: isArrayValue,
        maxFiles,
        onDrop: (acceptedFiles, fileRejections, event) => {
            const isOverflow =
                isArrayValue
                && typeof maxFiles === 'number'
                && maxFiles > 0
                && selectedFiles.length + acceptedFiles.length > maxFiles;

            if (isOverflow) {
                setMaxFilesError(`Превышено максимальное количество файлов: ${maxFiles}.`);
            } else {
                setMaxFilesError(null);
            }

            const nextFiles = mergeFiles(selectedFiles, acceptedFiles, isArrayValue, maxFiles);

            if (!isControlled) {
                setInnerFiles(nextFiles);
            }

            emitChange(nextFiles);

            onDrop?.(acceptedFiles, fileRejections, event);
            onDropAccepted?.(acceptedFiles, event);
            if (fileRejections.length > 0) {
                onDropRejected?.(fileRejections, event);
            }
        },
    });

    return {
        ...dropzone,
        isControlled,
        selectedFiles,
        filePreviews,
        removeFile,
        maxFilesError,
    };
}
