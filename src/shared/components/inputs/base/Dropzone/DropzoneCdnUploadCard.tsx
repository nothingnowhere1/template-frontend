import { useEffect, useMemo } from 'react';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';

import type { DropzoneCdnUploadItem } from './DropzoneCdn.types';

import { Button } from '@/shared/components/ui';

type DropzoneCdnUploadCardProps = {
    item: DropzoneCdnUploadItem;
    onDismiss: (localId: string) => void;
};

export function DropzoneCdnUploadCard({
    item,
    onDismiss,
}: DropzoneCdnUploadCardProps) {
    const isImage = item.file.type.startsWith('image/');
    const previewUrl = useMemo(
        () => (isImage ? URL.createObjectURL(item.file) : null),
        [isImage, item.file]
    );

    useEffect(() => () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl]);

    return (
        <div className="border-input bg-muted/20 flex items-center gap-3 rounded-md border p-2">
            <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded">
                {
                    previewUrl
                        ? (
                            <img
                                src={previewUrl}
                                alt={item.file.name}
                                className="h-full w-full object-cover"
                            />
                        )
                        : <FileText className="text-muted-foreground size-4"/>
                }
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{item.file.name}</p>

                {
                    item.status === 'error'
                        ? (
                            <p className="text-destructive mt-1 flex items-center gap-1 text-xs">
                                <AlertCircle className="size-3"/>
                                {item.errorMessage ?? 'Ошибка загрузки'}
                            </p>
                        )
                        : (
                            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                                <Loader2 className="size-3 animate-spin"/>
                                {item.status === 'uploading'
                                    ? `Загрузка ${item.progress}%`
                                    : `Обработка ${item.progress}%`}
                            </p>
                        )
                }
            </div>

            {
                item.status === 'error' && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => onDismiss(item.localId)}
                    >
                        Скрыть
                    </Button>
                )
            }
        </div>
    );
}
