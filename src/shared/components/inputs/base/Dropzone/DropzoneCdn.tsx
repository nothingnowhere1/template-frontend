import { useCallback } from 'react';

import { Dropzone } from './Dropzone';
import { DropzoneCdnUploadCard } from './DropzoneCdnUploadCard';
import type { DropzoneCdnProps } from './DropzoneCdn.types';
import { useDropzoneCdnPolling } from './hooks/useDropzoneCdnPolling';
import { useDropzoneCdnUploads } from './hooks/useDropzoneCdnUploads';
import { useDropzoneCdnValue } from './hooks/useDropzoneCdnValue';

import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

//  todo вернуться к дропзоне и дописать нормально когда разверну медиа сервер
export function DropzoneCdn<
    TMaxFiles extends number | undefined = undefined,
>({
    value,
    defaultValue,
    onChange,
    showValue = true,
    valueClassName,
    renderValueItem,
    onUploadProgress,
    onUploadError,
    ...dropzoneProps
}: DropzoneCdnProps<TMaxFiles>) {
    const {
        currentValue,
        appendUploadedValue,
        removeValueAt,
    } = useDropzoneCdnValue({
        value,
        defaultValue,
        onChange,
    });

    const {
        uploadItems,
        activeUploadsCount,
        startUploads,
        removeUploadItem,
        updateUploadItem,
    } = useDropzoneCdnUploads({
        onUploadProgress,
        onUploadError,
    });

    useDropzoneCdnPolling({
        uploadItems,
        appendUploadedValue,
        removeUploadItem,
        updateUploadItem,
        onUploadError,
    });

    const handleDrop = useCallback((files: Array<File>) => {
        startUploads(files);
    }, [startUploads]);

    const handleValueRemove = useCallback((index: number) => () => {
        removeValueAt(index);
    }, [removeValueAt]);

    const currentFilesCount = currentValue.length + activeUploadsCount;

    return (
        <div className="flex flex-col gap-3">
            <Dropzone
                {...dropzoneProps}
                currentFilesCount={currentFilesCount}
                onChange={handleDrop}
            />

            {
                uploadItems.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {uploadItems.map((item) => (
                            <DropzoneCdnUploadCard
                                key={item.localId}
                                item={item}
                                onDismiss={removeUploadItem}
                            />
                        ))}
                    </div>
                )
            }

            {
                showValue && currentValue.length > 0 && (
                    <div className={cn('flex flex-col gap-2', valueClassName)}>
                        {currentValue.map((item, index) => (
                            <div
                                key={item.id}
                                className="border-input bg-muted/20 flex items-center justify-between gap-2 rounded-md border p-2"
                            >
                                {
                                    renderValueItem
                                        ? renderValueItem(item, handleValueRemove(index))
                                        : (
                                            <>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="truncate text-sm underline-offset-4 hover:underline"
                                                >
                                                    {item.url}
                                                </a>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="xs"
                                                    onClick={handleValueRemove(index)}
                                                >
                                                    Удалить
                                                </Button>
                                            </>
                                        )
                                }
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
