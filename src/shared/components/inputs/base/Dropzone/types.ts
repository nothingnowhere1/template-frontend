import type { FieldError as TypeFieldError } from 'react-hook-form';
import type { DropzoneOptions } from 'react-dropzone';
import type React from 'react';

export type DropzoneValueType = 'file' | 'base64';

type ValueByType = {
    file: File;
    base64: string;
};

type AltValueByType = {
    file: string;
    base64: File;
};

type IsSingle<TMaxFiles extends number | undefined> = TMaxFiles extends 1 ? true : false;

type Output<TValueType extends DropzoneValueType, TMaxFiles extends number | undefined> =
    IsSingle<TMaxFiles> extends true
        ? ValueByType[TValueType] | null
        : Array<ValueByType[TValueType]>;

type Input<TValueType extends DropzoneValueType, TMaxFiles extends number | undefined> =
    | Output<TValueType, TMaxFiles>
    | (IsSingle<TMaxFiles> extends true
    ? AltValueByType[TValueType] | null
    : Array<AltValueByType[TValueType]>)
    | null
    | undefined;

type RenderFile = (file: File, removeFile: () => void) => React.ReactNode;

export type DropzoneProps<
    TValueType extends DropzoneValueType = 'file',
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
    showFiles?: boolean;
    renderFile?: RenderFile;

    valueType?: TValueType;
    value?: Input<TValueType, TMaxFiles>;
    defaultValue?: Input<TValueType, TMaxFiles>;
    onChange?: (value: Output<TValueType, TMaxFiles>) => void;

    maxFiles?: TMaxFiles;
} & Omit<DropzoneOptions, 'multiple' | 'maxFiles'>;

export type DropzoneOutputValue<
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
> = Output<TValueType, TMaxFiles>;

export type DropzoneInputValue<
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
> = Input<TValueType, TMaxFiles>;

export type FilePreview = {
    id: string;
    file: File;
    url: string;
    isImage: boolean;
};

export type FilePreviewZoneProps = {
    renderFile?: RenderFile;
    showFiles: boolean;
    removeFile: (index: number) => () => void;
    filePreviews: Array<FilePreview>
}

export type FilePreviewCardProps = FilePreview & {
    renderFile?: RenderFile;
    removeFile: () => void;
}
