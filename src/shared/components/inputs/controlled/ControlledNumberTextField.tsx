import React, { memo } from 'react';
import type { Control, FieldPath, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { NumberTextFieldProps } from '@/shared/components/inputs/base';
import { NumberTextField } from '@/shared/components/inputs/base';

export type ControlledNumberTextFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
} & NumberTextFieldProps;

export function ControlledNumberTextField<T extends FieldValues>({
    name,
    defaultValue,
    control,
    onBlur,
    onChange,
    ...props
}: ControlledNumberTextFieldProps<T>) {
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
                <NumberTextField
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

export default memo(ControlledNumberTextField) as <T extends FieldValues>(
    props: ControlledNumberTextFieldProps<T>
) => React.JSX.Element;
