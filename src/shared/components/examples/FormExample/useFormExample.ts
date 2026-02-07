import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { phoneSchema } from '@/shared/schemas';

const zodSchema = z.object({
    name: z.string().min(3, { message: 'Минимальное количество символов 3' }).max(50, { message: 'Максимальное количество символов 50' }),
    tel: phoneSchema
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
