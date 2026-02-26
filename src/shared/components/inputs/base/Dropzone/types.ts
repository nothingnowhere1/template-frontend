import type { FieldError as TypeFieldError } from 'react-hook-form';
import type { DropzoneOptions } from 'react-dropzone';
import type React from 'react';

export type DropzoneProps<
    TMaxFiles extends number | undefined = undefined,
> = {
    label?: string;
    description?: React.ReactNode;
    error?: TypeFieldError;
    inputId?: string;
    className?: string;
    inputClassName?: string;
    dropzoneClassName?: string;
    idleText?: React.ReactNode;
    activeText?: React.ReactNode;
    rejectText?: React.ReactNode;

    onChange?: (value: Array<File>) => void;
    currentFilesCount?: number;

    maxFiles?: TMaxFiles;
} & Omit<DropzoneOptions, 'multiple' | 'maxFiles'>;

export type DropzoneOutputValue = Array<File>;
