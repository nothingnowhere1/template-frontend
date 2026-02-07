import { useId } from 'react';
import type { FieldError as TypeFieldError } from 'react-hook-form';

import type { InputProps } from '@/components';
import { Field, FieldDescription, FieldError, FieldLabel, Input } from '@/components';

export type TextFieldProps = {
    label?: string;
    description?: React.ReactNode;
    error?: TypeFieldError
} & InputProps;

export function TextField({ label, description, error, ...props }: TextFieldProps) {
    const id = useId();

    return (
        <Field>
            {label && (
                <FieldLabel htmlFor={props.id ?? id}>{label}</FieldLabel>
            )}
            <Input
                id={id}
                {...props}
            />
            {
                !!description && !error && (
                    <FieldDescription>
                        {description}
                    </FieldDescription>
                )
            }
            {
                error && (
                    <FieldError errors={[error]}/>
                )
            }
        </Field>
    );
}
