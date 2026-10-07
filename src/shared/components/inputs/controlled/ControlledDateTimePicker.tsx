import React, { memo } from 'react';
import type {
    Control,
    FieldPathByValue,
    FieldValues,
    Path,
    PathValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { DateTimePickerProps } from '@/shared/components/inputs/base/DateTimePicker';
import { DateTimePicker } from '@/shared/components/inputs/base/DateTimePicker';

export type ControlledDateTimePickerProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPathByValue<T, Date | undefined>;
    defaultValue?: Date;
} & Omit<DateTimePickerProps, 'error' | 'onChange' | 'value'>;

export function ControlledDateTimePicker<T extends FieldValues>({
    control,
    name,
    defaultValue,
    ...props
}: ControlledDateTimePickerProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={
                (defaultValue ?? undefined) as PathValue<T, Path<T> & Date>
            }
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DateTimePicker
                    {...props}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            )}
        />
    );
}

export default memo(ControlledDateTimePicker) as <T extends FieldValues>(
    props: ControlledDateTimePickerProps<T>
) => React.JSX.Element;
