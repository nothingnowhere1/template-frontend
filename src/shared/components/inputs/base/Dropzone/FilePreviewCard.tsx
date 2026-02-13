import { FileText, X } from 'lucide-react';

import type { FilePreviewCardProps } from './types';

import { Button } from '@/shared';

export function FilePreviewCard({ file, isImage, url, renderFile, removeFile }: FilePreviewCardProps) {
    if (renderFile) {
        return renderFile(file, removeFile);
    }

    return (
        <div
            className="bg-muted/20 border-input relative overflow-hidden rounded-md border p-2"
        >
            <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="absolute right-1 top-1 z-10"
                aria-label={`Удалить ${file.name}`}
                onClick={() => removeFile()}
            >
                <X/>
            </Button>

            <div className="flex items-center gap-2">
                {
                    isImage ? (
                        <img
                            src={url}
                            alt={file.name}
                            className="h-14 w-14 rounded object-cover"
                        />
                    )
                        : (
                            <div className="bg-background rounded p-2">
                                <FileText className="text-muted-foreground size-4"/>
                            </div>
                        )}
                <div className="min-w-0">
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="truncate text-sm underline-offset-4 hover:underline"
                    >
                        {file.name}
                    </a>
                </div>
            </div>
        </div>
    );
}
