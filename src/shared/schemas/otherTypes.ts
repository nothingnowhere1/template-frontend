import z from 'zod';

import { phoneValidate } from '@/shared';

export const phoneSchema = z
    .string()
    .refine((arg) => !!phoneValidate(arg), 'Неверный номер телефона');
