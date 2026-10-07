import React, { memo } from 'react';
import type {
    Control,
    FieldPathByValue,
    FieldValues,
    Path,
    PathValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { TextareaFieldProps } from '@/shared/components/inputs/base';
import { TextareaField } from '@/shared/components/inputs/base';

export type ControlledTextareaFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPathByValue<T, string>;
} & TextareaFieldProps;

export function ControlledTextareaField<T extends FieldValues>({
    name,
    defaultValue,
    control,
    onBlur,
    onChange,
    ...props
}: ControlledTextareaFieldProps<T>) {
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
                <TextareaField
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

export default memo(ControlledTextareaField) as <T extends FieldValues>(
    props: ControlledTextareaFieldProps<T>
) => React.JSX.Element;
