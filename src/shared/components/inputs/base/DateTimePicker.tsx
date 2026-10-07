import { Calendar as CalendarIcon } from 'lucide-react';
import { TZDate } from 'react-day-picker';
import type { FieldError as TypeFieldError } from 'react-hook-form';
import type { ReactNode } from 'react';
import { useId } from 'react';

import type {
    ButtonProps,
    CalendarProps,
    InputProps,
    PopoverContentProps,
    PopoverProps,
    PopoverTriggerProps,
    TimeZone,
} from '@/shared';
import {
    Button,
    Calendar,
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared';
import { cn } from '@/shared/lib/utils';
import { formatDate } from '@/shared/utils/date';

type DateTimePickerSlotProps = {
    calendarProps?: Omit<
        CalendarProps,
        'mode' | 'onSelect' | 'selected' | 'timeZone'
    >;
    buttonProps?: ButtonProps;
    inputProps?: Omit<InputProps, 'onChange' | 'type' | 'value'>;
    popoverProps?: PopoverProps;
    popoverContentProps?: PopoverContentProps;
    popoverTriggerProps?: PopoverTriggerProps;
};

export type DateTimePickerProps = {
    value?: Date;
    onChange: (value: Date | undefined) => void;
    timeZone?: TimeZone;
    placeholder?: ReactNode;
    dateLabel?: ReactNode;
    timeLabel?: ReactNode;
    slotProps?: DateTimePickerSlotProps;
    error?: TypeFieldError;
    description?: ReactNode;
};

function toNativeDate(date: TZDate) {
    return new Date(date.getTime());
}

function getTimeValue(date: TZDate | undefined) {
    if (!date) {
        return '';
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function DateTimePicker({
    value,
    onChange,
    timeZone = 'UTC',
    placeholder = 'Выберите дату',
    dateLabel = 'Дата',
    timeLabel = 'Время',
    slotProps = {},
    error,
    description,
}: DateTimePickerProps) {
    const generatedDateInputId = useId();
    const generatedTimeInputId = useId();
    const {
        calendarProps,
        buttonProps,
        inputProps,
        popoverProps,
        popoverContentProps,
        popoverTriggerProps,
    } = slotProps;
    const dateInputId = buttonProps?.id ?? generatedDateInputId;
    const timeInputId = inputProps?.id ?? generatedTimeInputId;
    const zonedValue = value ? new TZDate(value, timeZone) : undefined;

    const handleDateChange = (date: Date | undefined) => {
        if (!date) {
            onChange(undefined);
            return;
        }

        const zonedDate = new TZDate(date, timeZone);
        const nextValue = new TZDate(
            zonedDate.getFullYear(),
            zonedDate.getMonth(),
            zonedDate.getDate(),
            zonedValue?.getHours() ?? 0,
            zonedValue?.getMinutes() ?? 0,
            zonedValue?.getSeconds() ?? 0,
            zonedValue?.getMilliseconds() ?? 0,
            timeZone,
        );

        onChange(toNativeDate(nextValue));
    };

    const handleTimeChange = (time: string) => {
        if (!zonedValue) {
            return;
        }

        const [hours, minutes, seconds = 0] = time.split(':').map(Number);

        if (
            !Number.isInteger(hours) ||
            !Number.isInteger(minutes) ||
            !Number.isInteger(seconds)
        ) {
            return;
        }

        const nextValue = new TZDate(
            zonedValue.getFullYear(),
            zonedValue.getMonth(),
            zonedValue.getDate(),
            hours,
            minutes,
            seconds,
            0,
            timeZone,
        );

        onChange(toNativeDate(nextValue));
    };

    return (
        <>
            <FieldGroup className="flex-row gap-3">
                <Field>
                    <FieldLabel htmlFor={dateInputId}>{dateLabel}</FieldLabel>
                    <Popover {...popoverProps}>
                        <PopoverTrigger
                            {...popoverTriggerProps}
                            asChild
                        >
                            <Button
                                variant="outline"
                                type="button"
                                data-empty={!value}
                                {...buttonProps}
                                id={dateInputId}
                                aria-invalid={
                                    error ? true : buttonProps?.['aria-invalid']
                                }
                                className={cn(
                                    'data-[empty=true]:text-muted-foreground w-full justify-start truncate text-left font-normal',
                                    buttonProps?.className,
                                )}
                            >
                                <CalendarIcon/>
                                {zonedValue
                                    ? formatDate(zonedValue, 'PPP')
                                    : placeholder}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            {...popoverContentProps}
                            className={cn(
                                'w-auto p-0',
                                popoverContentProps?.className,
                            )}
                        >
                            <Calendar
                                {...calendarProps}
                                mode="single"
                                selected={zonedValue}
                                timeZone={timeZone}
                                onSelect={handleDateChange}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field className="w-32 shrink-0">
                    <FieldLabel htmlFor={timeInputId}>{timeLabel}</FieldLabel>
                    <Input
                        {...inputProps}
                        id={timeInputId}
                        type="time"
                        step={inputProps?.step ?? 1}
                        value={getTimeValue(zonedValue)}
                        aria-invalid={error ? true : inputProps?.['aria-invalid']}
                        className={cn(
                            'appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
                            inputProps?.className,
                        )}
                        disabled={
                            !zonedValue ||
                            buttonProps?.disabled ||
                            inputProps?.disabled
                        }
                        onChange={(event) => {
                            handleTimeChange(event.target.value);
                        }}
                    />
                </Field>
            </FieldGroup>
            {!!description && !error && (
                <FieldDescription>{description}</FieldDescription>
            )}
            {error && <FieldError errors={[error]}/>}
        </>
    );
}
