import { useFormExample } from './useFormExample';

import {
    Button,
    ControlledNumberTextField,
    ControlledPasswordTextField,
    ControlledPhoneTextField,
    ControlledTextField,
    Dropzone
} from '@/shared/components';

export function FormExample() {
    const { control, onSubmit } = useFormExample();

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
        >
            <h3>Form Example</h3>
            <ControlledTextField
                label="Имя"
                control={control}
                name="name"
            />
            <ControlledNumberTextField
                label="Номер"
                control={control}
                name="number"
            />
            <ControlledPhoneTextField
                label="Телефон"
                control={control}
                name="tel"
            />
            <ControlledPasswordTextField
                label="Пароль"
                control={control}
                name="password"
            />
            <Dropzone
                maxFiles={3}
                onChange={(file) => console.log(file)}
            />
            <Button
                variant="outline"
                type="submit"
            >
                Сабмит
            </Button>
        </form>
    );
}
