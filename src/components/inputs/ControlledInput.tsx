import React, { memo } from 'react';
import type { Control, FieldPath, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { TextFieldProps } from '@/components/inputs/TextField.tsx';
import { TextField } from '@/components/inputs/TextField.tsx';

export type ControlledInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
} & TextFieldProps;

export function ControlledInput<T extends FieldValues>({
    name,
    defaultValue,
    control,
    onBlur,
    onChange,
    ...props
}: ControlledInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={(defaultValue ?? '') as PathValue<T, Path<T> & string>}
            render={({
                field: {
                    onChange: fieldOnChange,
                    onBlur: fieldOnBlur,
                    ...field
                },
                fieldState
            }) => (
                <TextField
                    {...fieldState}
                    {...props}
                    {...field}
                    onChange={(e) => {
                        onChange?.(e);
                        fieldOnChange(e);
                    }}
                    onBlur={(e) => {
                        onBlur?.(e);
                        fieldOnBlur();
                    }}
                />
            )}
        />
    );
}

export default memo(ControlledInput) as <T extends FieldValues>(
    props: ControlledInputProps<T>
) => React.JSX.Element;
