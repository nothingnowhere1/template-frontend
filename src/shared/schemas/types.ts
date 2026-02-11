import type z from 'zod';

export type WithNullable<TSchema extends z.ZodTypeAny, TNullable extends boolean> =
    TNullable extends true ? z.ZodNullable<TSchema> : TSchema;

export type WithOptional<TSchema extends z.ZodTypeAny, TOptional extends boolean> =
    TOptional extends true ? z.ZodOptional<TSchema> : TSchema;

export type OptionsMinMax = {
    min?: number;
    max?: number;
    optional?: boolean;
    nullable?: boolean;
};
