import { useId } from 'react';
import type { ReactNode } from 'react';
import type { FieldError as TypeFieldError } from 'react-hook-form';

import type {
    SelectContentProps,
    SelectProps,
    SelectTriggerProps,
} from '@/shared/components/ui';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

export type SelectFieldOption<TValue extends string = string> = {
    value: TValue;
    label: ReactNode;
    disabled?: boolean;
    textValue?: string;
};

type SelectFieldSlotProps = {
    triggerProps?: SelectTriggerProps;
    contentProps?: SelectContentProps;
};

export type SelectFieldProps<TValue extends string = string> = Omit<
    SelectProps,
    'defaultValue' | 'onValueChange' | 'value'
> & {
    value?: TValue;
    defaultValue?: TValue;
    onValueChange?: (value: TValue) => void;
    options: ReadonlyArray<SelectFieldOption<TValue>>;
    label?: ReactNode;
    placeholder?: ReactNode;
    description?: ReactNode;
    error?: TypeFieldError;
    slotProps?: SelectFieldSlotProps;
};

export function SelectField<TValue extends string = string>({
    value,
    defaultValue,
    onValueChange,
    options,
    label,
    placeholder,
    description,
    error,
    slotProps = {},
    disabled,
    ...props
}: SelectFieldProps<TValue>) {
    const generatedId = useId();
    const { triggerProps, contentProps } = slotProps;
    const id = triggerProps?.id ?? generatedId;

    return (
        <Field
            data-invalid={!!error}
            data-disabled={disabled}
        >
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <Select
                {...props}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onValueChange={(value) => {
                    onValueChange?.(value as TValue);
                }}
            >
                <SelectTrigger
                    {...triggerProps}
                    id={id}
                    aria-invalid={error ? true : triggerProps?.['aria-invalid']}
                    className={cn('w-full', triggerProps?.className)}
                >
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent {...contentProps}>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            textValue={option.textValue}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!!description && !error && (
                <FieldDescription>{description}</FieldDescription>
            )}
            {error && <FieldError errors={[error]}/>}
        </Field>
    );
}
