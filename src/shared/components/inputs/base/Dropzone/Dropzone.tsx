import { useId } from 'react';

import { useDropzoneField } from './useDropzoneField';
import type { DropzoneProps, DropzoneValueType, } from './types';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { FilePreviewZone } from '@/shared/components/inputs/base/Dropzone/FilePreviewZone';

export type {
    DropzoneOutputValue,
    DropzoneProps,
    DropzoneValueType,
} from './types';

export function Dropzone<
    TValueType extends DropzoneValueType,
    TMaxFiles extends number | undefined,
>({
    label,
    description,
    error,
    inputId,
    className,
    inputClassName,
    dropzoneClassName,
    idleText = 'Перетащите файлы сюда или нажмите, чтобы выбрать',
    activeText = 'Отпустите файлы для загрузки',
    rejectText = 'Некоторые файлы не подходят под ограничения',
    showFiles = true,
    renderFile,
    ...dropzoneProps
}: DropzoneProps<TValueType, TMaxFiles>) {
    const generatedId = useId();
    const id = inputId ?? generatedId;

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        filePreviews,
        removeFile,
        maxFilesError,
    } = useDropzoneField<TValueType, TMaxFiles>(dropzoneProps);

    const message = isDragReject
        ? rejectText
        : isDragActive
            ? activeText
            : idleText;

    return (
        <Field className={className}>
            {label && (
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
            )}

            <div
                {...getRootProps({
                    className: cn(
                        'border-input hover:border-primary/40 focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
                        isDragActive && 'border-primary bg-primary/5',
                        isDragReject && 'border-destructive bg-destructive/5',
                        dropzoneClassName
                    ),
                })}
            >
                <input
                    {...getInputProps({
                        id,
                        className: inputClassName,
                    })}
                />
                <p className="text-muted-foreground">{message}</p>
            </div>

            {!!description && !error && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}

            <FieldError errors={[error, maxFilesError ? { message: maxFilesError } : undefined]}/>

            <FilePreviewZone
                removeFile={removeFile}
                renderFile={renderFile}
                filePreviews={filePreviews}
                showFiles={showFiles}
            />
        </Field>
    );
}
