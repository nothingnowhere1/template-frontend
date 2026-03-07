import { Calendar as CalendarIcon } from 'lucide-react';
import type { DayPickerProps } from 'react-day-picker';
import type { FieldError as TypeFieldError } from 'react-hook-form';
import type { ReactNode } from 'react';

import type { ButtonProps, CalendarProps, PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@/shared';
import { Button, Calendar, FieldDescription, FieldError, Popover, PopoverContent, PopoverTrigger } from '@/shared';
import { formatDate } from '@/shared/utils/date';

type BaseDatePickerProps = {
    slotProps?: {
        calendarProps?: Omit<CalendarProps, keyof DayPickerProps>;
        buttonProps?: ButtonProps;
        popoverProps?: PopoverProps;
        popoverContentProps?: PopoverContentProps;
        popoverTriggerProps?: PopoverTriggerProps;
    };
    error?: TypeFieldError,
    description?: ReactNode;
};

export type DatePickerProps = BaseDatePickerProps & DayPickerProps;

export type DatePickerMode = DayPickerProps['mode'];

export type DatePickerSelected<TMode extends DatePickerMode = DatePickerMode> =
    Extract<DayPickerProps, { mode: TMode }>['selected'];

export type DatePickerOnSelect<TMode extends DatePickerMode = DatePickerMode> =
    Extract<DayPickerProps, { mode: TMode }>['onSelect'];

export function DatePicker({
    slotProps = {},
    error,
    description,
    ...dayPickerProps
}: DatePickerProps) {
    const { calendarProps, buttonProps, popoverProps, popoverContentProps, popoverTriggerProps } = slotProps;

    const inputValue = 'selected' in dayPickerProps ? dayPickerProps.selected : null;

    return (
        <>
            <Popover {...popoverProps}>
                <PopoverTrigger
                    {...popoverTriggerProps}
                    asChild
                >
                    <Button
                        variant="outline"
                        data-empty={!inputValue}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal truncate"
                        type="button"
                        {...buttonProps}
                    >
                        <CalendarIcon/>
                        {formatDate(inputValue, 'PPP')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    {...popoverContentProps}
                >
                    <Calendar
                        {...calendarProps}
                        {...dayPickerProps}
                    />
                </PopoverContent>
            </Popover>
            {
                !!description && !error && (
                    <FieldDescription>
                        {description}
                    </FieldDescription>
                )
            }
            {
                error && (
                    <FieldError errors={[error]}/>
                )
            }
        </>
    );
}
