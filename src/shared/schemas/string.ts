import { z } from 'zod';

import type { OptionsMinMax, WithNullable, WithOptional } from './types';

type StringSchemaResult<TOptions extends OptionsMinMax> =
    WithOptional<
        WithNullable<z.ZodString, TOptions['nullable'] extends true ? true : false>,
        TOptions['optional'] extends true ? true : false
    >;

export const stringFromInput = <TSchema extends z.ZodTypeAny>(
    schema: TSchema,
    opts?: { optional?: boolean; nullable?: boolean }
) =>
        z.preprocess((v) => {
            if (v === '') {
                if (opts?.optional) return undefined;
                if (opts?.nullable) return null;
                return '';
            }
            if (v === null || v === undefined) return v;
            return String(v);
        }, schema);

export const stringMinMaxSchema = <TOptions extends OptionsMinMax>(
    o: TOptions
): StringSchemaResult<TOptions> => {
    let schema = z.string();

    if (o.min !== undefined) schema = schema.min(o.min, `Минимальная длина ${o.min} символов`);
    if (o.max !== undefined) schema = schema.max(o.max, `Максимальная длина ${o.max} символов`);

    let result: z.ZodTypeAny = schema;

    if (o.nullable) result = result.nullable();
    if (o.optional) result = result.optional();

    return stringFromInput(result, o) as unknown as StringSchemaResult<TOptions>;
};
