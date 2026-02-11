import type { ChangeEvent } from 'react';

import type { TextFieldProps } from '@/shared/components/inputs/base';
import { TextField } from '@/shared/components/inputs/base';

export type PhoneTextFieldProps = TextFieldProps;

const normalizePhoneValue = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (!digits) {
        return '';
    }

    if (digits.startsWith('8')) {
        digits = `7${digits.slice(1)}`;
    } else if (!digits.startsWith('7')) {
        digits = `7${digits}`;
    }

    return digits.slice(0, 11);
};

const maskPhoneNumber = (value: string) => {
    const raw = normalizePhoneValue(value);

    if (!raw) {
        return '';
    }

    const local = raw.slice(1);
    const parts = local.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (!parts) {
        return '';
    }

    const area = parts[1];
    const first = parts[2];
    const second = parts[3];
    const third = parts[4];

    let result = '+7';

    if (area) {
        result += ` (${area}`;
    }
    if (first) {
        result += `) ${first}`;
    }
    if (second) {
        result += `-${second}`;
    }
    if (third) {
        result += `-${third}`;
    }

    return result;
};

const mapValueToString = (value: PhoneTextFieldProps['value']) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
};

export function PhoneTextField({
    inputMode = 'tel',
    autoComplete = 'tel',
    onChange,
    value,
    ...props
}: PhoneTextFieldProps) {
    const normalizedValue = normalizePhoneValue(mapValueToString(value));

    return (
        <TextField
            {...props}
            inputMode={inputMode}
            autoComplete={autoComplete}
            value={maskPhoneNumber(normalizedValue)}
            onChange={(e) => {
                const raw = normalizePhoneValue(e.target.value);
                e.currentTarget.value = maskPhoneNumber(raw);

                if (!onChange) {
                    return;
                }

                const nextEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value: raw,
                    },
                    currentTarget: {
                        ...e.currentTarget,
                        value: raw,
                    },
                } as ChangeEvent<HTMLInputElement>;

                onChange(nextEvent);
            }}
        />
    );
}
