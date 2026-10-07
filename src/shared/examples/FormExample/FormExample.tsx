import { useFormExample } from './useFormExample';

import {
    Button,
    ControlledCheckboxField,
    ControlledDatePicker,
    ControlledDateTimePicker,
    ControlledNumberTextField,
    ControlledPasswordTextField,
    ControlledPhoneTextField,
    ControlledSelectField,
    ControlledTextField,
    ControlledTextareaField,
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
            <ControlledTextareaField
                label="О себе"
                control={control}
                name="bio"
                rows={4}
                placeholder="Расскажите немного о себе"
                description="От 10 до 1000 символов"
            />
            <ControlledSelectField
                label="Роль"
                control={control}
                name="role"
                placeholder="Выберите роль"
                options={[
                    { value: 'user', label: 'Пользователь' },
                    { value: 'manager', label: 'Менеджер' },
                    { value: 'admin', label: 'Администратор' },
                ]}
            />
            <ControlledCheckboxField
                label="Включить уведомления"
                description="Настройку можно изменить в любое время"
                control={control}
                name="notificationsEnabled"
                defaultValue={false}
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
