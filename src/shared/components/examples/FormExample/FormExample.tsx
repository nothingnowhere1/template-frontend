import {
    Button,
    ControlledInput,
    ControlledNumberTextField,
    ControlledPasswordTextField,
    ControlledPhoneTextField
} from '@/shared/components';
import { useFormExample } from '@/shared/components/examples/FormExample/useFormExample.ts';

export function FormExample() {
    const { control, onSubmit } = useFormExample();

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
        >
            <h3>Form Example</h3>
            <ControlledInput
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
            <Button
                variant="outline"
                type="submit"
            >
                Сабмит
            </Button>
        </form>
    );
}
