import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DropzoneCdnValue } from '../DropzoneCdn.types';

import type { MediaUploadResult } from '@/shared/queries/media.service';

type UseDropzoneCdnValueParams = {
    value?: DropzoneCdnValue;
    defaultValue?: DropzoneCdnValue;
    onChange?: (value: DropzoneCdnValue) => void;
};

export function useDropzoneCdnValue({
    value,
    defaultValue,
    onChange,
}: UseDropzoneCdnValueParams) {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState<DropzoneCdnValue>(defaultValue ?? []);

    const currentValue = useMemo<DropzoneCdnValue>(
        () => value ?? innerValue,
        [value, innerValue]
    );

    const currentValueRef = useRef<DropzoneCdnValue>(currentValue);

    useEffect(() => {
        currentValueRef.current = currentValue;
    }, [currentValue]);

    const emitChange = useCallback((nextValue: DropzoneCdnValue) => {
        currentValueRef.current = nextValue;

        if (!isControlled) {
            setInnerValue(nextValue);
        }

        onChange?.(nextValue);
    }, [isControlled, onChange]);

    const appendUploadedValue = useCallback((result: MediaUploadResult) => {
        const hasDuplicate = currentValueRef.current.some((item) => item.id === result.id);
        if (hasDuplicate) {
            return;
        }

        emitChange([...currentValueRef.current, result]);
    }, [emitChange]);

    const removeValueAt = useCallback((index: number) => {
        const nextValue = currentValueRef.current.filter((_, currentIndex) => currentIndex !== index);
        emitChange(nextValue);
    }, [emitChange]);

    return {
        currentValue,
        appendUploadedValue,
        removeValueAt,
    };
}
