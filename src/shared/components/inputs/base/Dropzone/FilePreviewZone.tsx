import { FilePreviewCard } from './FilePreviewCard';
import type { FilePreviewZoneProps } from './types';

export function FilePreviewZone({ showFiles, filePreviews, renderFile, removeFile }: FilePreviewZoneProps) {
    if (!showFiles || !filePreviews.length) {
        return null;
    }

    return (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filePreviews.map((preview, index) => (
                <FilePreviewCard
                    {...preview}
                    removeFile={removeFile(index)}
                    renderFile={renderFile}
                    key={preview.id}
                />
            ))}
        </div>
    );
}
