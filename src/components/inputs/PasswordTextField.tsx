import { useId, useState } from 'react';
import type { FieldError as TypeFieldError } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import type { InputProps } from '@/components';
import {
    Button,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    Input,
} from '@/components';
import { cn } from '@/lib/utils';

export type PasswordTextFieldProps = {
    label?: string;
    description?: React.ReactNode;
    error?: TypeFieldError;
} & InputProps;

export function PasswordTextField({
    label,
    description,
    error,
    disabled,
    className,
    ...props
}: PasswordTextFieldProps) {
    const id = useId();
    const [visible, setVisible] = useState(false);

    return (
        <Field>
            {label && (
                <FieldLabel htmlFor={props.id ?? id}>{label}</FieldLabel>
            )}
            <div className="relative">
                <Input
                    id={id}
                    {...props}
                    disabled={disabled}
                    type={visible ? 'text' : 'password'}
                    className={cn('pr-10', className)}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    disabled={disabled}
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setVisible((value) => !value)}
                >
                    {visible ? <EyeOff /> : <Eye />}
                </Button>
            </div>
            {!!description && !error && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}
            {error && (
                <FieldError errors={[error]}/>
            )}
        </Field>
    );
}
