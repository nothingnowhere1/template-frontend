import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { numberMinMaxSchema, phoneSchema, stringMinMaxSchema } from '@/shared/schemas';

const zodSchema = z.object({
    name: stringMinMaxSchema({ min: 3, max: 255, nullable: true }),
    tel: phoneSchema,
    number: numberMinMaxSchema({ min: 1, max: 10, nullable: true }),
    password: stringMinMaxSchema({ min: 3, max: 255, nullable: true })
});

type zodSchemaType = z.infer<typeof zodSchema>;

export function useFormExample() {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(zodSchema)
    });

    const submitHandler: SubmitHandler<zodSchemaType> = (data) => {
        console.log(data);
    };

    const onSubmit = handleSubmit(submitHandler);

    return { control, onSubmit };
}
