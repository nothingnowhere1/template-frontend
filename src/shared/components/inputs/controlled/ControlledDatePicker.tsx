import React, { memo } from 'react';
import type { Control, FieldPathByValue, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { DateRange } from 'react-day-picker';

import type { DatePickerProps, DatePickerSelected } from '@/shared/components/inputs/base/DatePicker';
import { DatePicker } from '@/shared/components/inputs/base/DatePicker';

type DatePickerValueByMode = {
    single: Date | undefined;
    multiple: Array<Date> | undefined;
    range: DateRange | undefined;
};

type ControlledDatePickerCommonProps<T extends FieldValues> = {
    control: Control<T>;
} & Omit<DatePickerProps, 'mode' | 'selected' | 'onSelect' | 'error'>;

type ControlledDatePickerSingleProps<T extends FieldValues> = {
    name: FieldPathByValue<T, DatePickerValueByMode['single']>;
    defaultValue?: DatePickerValueByMode['single'];
    mode?: 'single';
} & ControlledDatePickerCommonProps<T>;

type ControlledDatePickerMultipleProps<T extends FieldValues> = {
    name: FieldPathByValue<T, DatePickerValueByMode['multiple']>;
    defaultValue?: DatePickerValueByMode['multiple'];
    mode: 'multiple';
} & ControlledDatePickerCommonProps<T>;

type ControlledDatePickerRangeProps<T extends FieldValues> = {
    name: FieldPathByValue<T, DatePickerValueByMode['range']>;
    defaultValue?: DatePickerValueByMode['range'];
    mode: 'range';
} & ControlledDatePickerCommonProps<T>;

export type ControlledDatePickerProps<T extends FieldValues> =
    | ControlledDatePickerSingleProps<T>
    | ControlledDatePickerMultipleProps<T>
    | ControlledDatePickerRangeProps<T>;

export function ControlledDatePicker<T extends FieldValues>({
    name,
    defaultValue,
    control,
    mode = 'single',
    ...props
}: ControlledDatePickerProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={(defaultValue ?? undefined) as PathValue<T, Path<T> & Date>}
            render={({
                field: {
                    onChange,
                    onBlur,
                    value,
                    ...field
                },
                fieldState: { error },
            }) => (
                <DatePicker
                    {...props}
                    {...field}
                    mode={mode}
                    selected={value}
                    error={error}
                    onSelect={(value: DatePickerSelected) => {
                        onChange(value);
                    }}
                />
            )}
        />
    );
}

export default memo(ControlledDatePicker) as <T extends FieldValues>(
    props: ControlledDatePickerProps<T>
) => React.JSX.Element;
