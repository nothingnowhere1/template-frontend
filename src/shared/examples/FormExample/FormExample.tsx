import { useFormExample } from './useFormExample';

import {
    Button,
    ControlledDateTimePicker,
    ControlledNumberTextField,
    ControlledPasswordTextField,
    ControlledPhoneTextField,
    ControlledTextField,
    Dropzone
} from '@/shared/components';
import { ControlledDatePicker } from '@/shared/components/inputs/controlled/ControlledDatePicker';

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
            <ControlledDatePicker
                control={control}
                name="date"
                mode="range"
            />
            <ControlledDateTimePicker
                control={control}
                name="dateTime"
                timeZone="Asia/Yekaterinburg"
                description="Дата и время в часовом поясе Екатеринбурга"
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
