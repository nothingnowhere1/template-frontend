import React, { memo } from 'react';
import type {
    Control,
    FieldPathByValue,
    FieldValues,
    Path,
    PathValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { SelectFieldProps } from '@/shared/components/inputs/base';
import { SelectField } from '@/shared/components/inputs/base';

export type ControlledSelectFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPathByValue<T, string | undefined>;
    defaultValue?: string;
} & Omit<
    SelectFieldProps,
    'defaultValue' | 'error' | 'name' | 'onValueChange' | 'value'
>;

export function ControlledSelectField<T extends FieldValues>({
    control,
    name,
    defaultValue,
    slotProps = {},
    ...props
}: ControlledSelectFieldProps<T>) {
    const { triggerProps, ...restSlotProps } = slotProps;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={
                (defaultValue ?? undefined) as PathValue<T, Path<T> & string>
            }
            render={({
                field: { onBlur, onChange, ref, value, name: fieldName },
                fieldState: { error },
            }) => (
                <SelectField
                    {...props}
                    name={fieldName}
                    value={value as string | undefined}
                    error={error}
                    slotProps={{
                        ...restSlotProps,
                        triggerProps: {
                            ...triggerProps,
                            ref,
                            onBlur: (event) => {
                                triggerProps?.onBlur?.(event);
                                onBlur();
                            },
                        },
                    }}
                    onValueChange={onChange}
                />
            )}
        />
    );
}

export default memo(ControlledSelectField) as <T extends FieldValues>(
    props: ControlledSelectFieldProps<T>
) => React.JSX.Element;
