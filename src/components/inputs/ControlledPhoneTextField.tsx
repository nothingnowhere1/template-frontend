import React, { memo } from 'react';
import type { Control, FieldPath, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { PhoneTextFieldProps } from '@/components/inputs/PhoneTextField';
import { PhoneTextField } from '@/components/inputs/PhoneTextField';

export type ControlledPhoneTextFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
} & PhoneTextFieldProps;

export function ControlledPhoneTextField<T extends FieldValues>({
    name,
    defaultValue,
    control,
    onBlur,
    onChange,
    ...props
}: ControlledPhoneTextFieldProps<T>) {
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
                fieldState,
            }) => (
                <PhoneTextField
                    {...fieldState}
                    {...props}
                    {...field}
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

export default memo(ControlledPhoneTextField) as <T extends FieldValues>(
    props: ControlledPhoneTextFieldProps<T>
) => React.JSX.Element;
