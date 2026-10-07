import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { numberMinMaxSchema, phoneSchema, stringMinMaxSchema } from '@/shared/schemas';

const zodSchema = z.object({
    name: stringMinMaxSchema({ min: 3, max: 255 }),
    bio: stringMinMaxSchema({ min: 10, max: 1000 }),
    tel: phoneSchema,
    number: numberMinMaxSchema({ min: 1, max: 10, nullable: true }),
    password: stringMinMaxSchema({ min: 3, max: 255 }),
    date: z.object({
        to: z.date(),
        from: z.date(),
    }),
    dateTime: z.date(),
});

type zodSchemaType = z.infer<typeof zodSchema>;

export function useFormExample() {
    const { control, handleSubmit } = useForm<zodSchemaType>({
        resolver: zodResolver(zodSchema)
    });

    const submitHandler: SubmitHandler<zodSchemaType> = (data) => {
        console.log(data);
    };

    const onSubmit = handleSubmit(submitHandler);

    return { control, onSubmit };
}
