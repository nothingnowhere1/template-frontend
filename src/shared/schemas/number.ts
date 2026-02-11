import z from 'zod';

import type { OptionsMinMax, WithNullable, WithOptional } from './types';

type NumberSchemaResult<TOptions extends OptionsMinMax> =
    WithOptional<
        WithNullable<z.ZodNumber, TOptions['nullable'] extends true ? true : false>,
        TOptions['optional'] extends true ? true : false
    >;

export const numberFromInput = <T extends z.ZodTypeAny>(
    schema: T,
    opts?: { optional?: boolean; nullable?: boolean }
) => z
        .preprocess((v) => {
            if (v === '') {
                return opts?.optional ? undefined : null;
            }
            if (v === null || v === undefined) {
                return v;
            }
            return +(v);
        }, schema);

export const numberMinMaxSchema = <TOptions extends OptionsMinMax>(
    o: TOptions
): NumberSchemaResult<TOptions> => {
    let schema = z.number();

    if (o.min !== undefined) {
        schema = schema.min(o.min, `Минимальное число ${o.min}`);
    }

    if (o.max !== undefined) {
        schema = schema.max(o.max, `Максимальное число ${o.max}`);
    }

    let result: z.ZodTypeAny = schema;

    if (o.nullable) {
        result = result.nullable();
    }
    if (o.optional) {
        result = result.optional();
    }

    return numberFromInput(result, o) as unknown as NumberSchemaResult<TOptions>;
};
