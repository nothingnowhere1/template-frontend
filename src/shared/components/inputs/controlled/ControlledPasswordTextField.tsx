import React, { memo } from 'react';
import type { Control, FieldPath, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { PasswordTextFieldProps } from '@/shared/components/inputs/base';
import { PasswordTextField } from '@/shared/components/inputs/base';

export type ControlledPasswordTextFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
} & PasswordTextFieldProps;

export function ControlledPasswordTextField<T extends FieldValues>({
    name,
    defaultValue,
    control,
    onBlur,
    onChange,
    ...props
}: ControlledPasswordTextFieldProps<T>) {
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
                fieldState: { error },
            }) => (
                <PasswordTextField
                    {...props}
                    {...field}
                    error={error}
                    onChange={(event) => {
                        onChange?.(event);
                        fieldOnChange(event);
                    }}
                    onBlur={(event) => {
                        onBlur?.(event);
                        fieldOnBlur();
                    }}
                />
            )}
        />
    );
}

export default memo(ControlledPasswordTextField) as <T extends FieldValues>(
    props: ControlledPasswordTextFieldProps<T>
) => React.JSX.Element;
