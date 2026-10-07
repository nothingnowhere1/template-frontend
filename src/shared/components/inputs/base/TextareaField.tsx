import { useId } from 'react';
import type { FieldError as TypeFieldError } from 'react-hook-form';

import type { TextareaProps } from '@/shared/components/ui';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    Textarea,
} from '@/shared/components/ui';

export type TextareaFieldProps = {
    label?: string;
    description?: React.ReactNode;
    error?: TypeFieldError;
} & TextareaProps;

export function TextareaField({
    label,
    description,
    error,
    ...props
}: TextareaFieldProps) {
    const generatedId = useId();
    const id = props.id ?? generatedId;

    return (
        <Field data-invalid={!!error}>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <Textarea
                {...props}
                id={id}
                aria-invalid={error ? true : props['aria-invalid']}
            />
            {!!description && !error && (
                <FieldDescription>{description}</FieldDescription>
            )}
            {error && <FieldError errors={[error]} />}
        </Field>
    );
}
