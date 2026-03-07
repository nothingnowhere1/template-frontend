import type { FormatOptions } from 'date-fns/format';
import type { DateRange } from 'react-day-picker';
import type { ReactNode } from 'react';
import { format } from 'date-fns';

export const formatDate = (
    date: Date | DateRange | Array<Date> | undefined | null,
    formatStr: string,
    emptyNode: ReactNode = 'Не выбрано',
    options?: FormatOptions
) => {
    if (!date) {
        return emptyNode;
    }

    if (date instanceof Date) {
        return format(date, formatStr, options);
    }

    if (Array.isArray(date)) {
        return date.map((item) => format(item, formatStr, options)).join(', ');
    }

    if ('to' in date) {
        if (!date.to && !date.from) {
            return emptyNode;
        }
        let str = '';
        if (date.to) {
            str += `С ${format(date.to, formatStr, options)} `;
        }
        if (date.from) {
            str += `по ${format(date.from, formatStr, options)}`;
        }

        return str;
    }
};
