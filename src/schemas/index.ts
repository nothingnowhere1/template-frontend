import z from 'zod';

import { phoneValidate } from '@/utils';

export const phoneSchema = z
    .string().refine((arg) => !!phoneValidate(arg), 'Неверный номер телефона');
