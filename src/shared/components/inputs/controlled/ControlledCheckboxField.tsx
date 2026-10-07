import React, { memo } from 'react';
import type { Control, FieldPathByValue, FieldValues, Path, PathValue, } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { CheckboxFieldProps } from '@/shared/components/inputs/base';
import { CheckboxField } from '@/shared/components/inputs/base';

export type ControlledCheckboxFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPathByValue<T, boolean>;
    defaultValue?: boolean;
} & Omit<
    CheckboxFieldProps,
    'checked' | 'defaultChecked' | 'defaultValue' | 'error' | 'name' | 'onCheckedChange'
>;

export function ControlledCheckboxField<T extends FieldValues>({
    control,
    name,
    defaultValue = false,
    ...props
}: ControlledCheckboxFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue as PathValue<T, Path<T> & boolean>}
            render={({
                field: { onBlur, onChange, ref, value, name: fieldName },
                fieldState: { error },
            }) => (
                <CheckboxField
                    {...props}
                    ref={ref}
                    name={fieldName}
                    checked={value === true}
                    error={error}
                    onBlur={onBlur}
                    onCheckedChange={(checked) => {
                        onChange(checked === true);
                    }}
                />
            )}
        />
    );
}

export default memo(ControlledCheckboxField) as <T extends FieldValues>(
    props: ControlledCheckboxFieldProps<T>
) => React.JSX.Element;
