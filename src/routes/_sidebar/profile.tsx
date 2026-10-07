import { createFileRoute } from '@tanstack/react-router';
import { Camera, Mail, MapPin, Phone } from 'lucide-react';

export const Route = createFileRoute('/_sidebar/profile')({
    component: Profile,
});

function Profile() {
    return (
        <div className="mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">Профиль</h2>
                <p className="text-sm text-muted-foreground">Личная информация и настройки аккаунта</p>
            </div>

            {/* Avatar + name */}
            <div className="flex items-center gap-5 rounded-xl border p-5">
                <div className="relative">
                    <div
                        className="flex size-20 items-center justify-center rounded-full bg-accent text-2xl font-bold select-none"
                    >
                        АИ
                    </div>
                    <button
                        className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent transition-colors"
                    >
                        <Camera className="size-3.5"/>
                    </button>
                </div>
                <div>
                    <p className="text-lg font-semibold">Алексей Иванов</p>
                    <p className="text-sm text-muted-foreground">alexey@example.com</p>
                    <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">
                        Администратор
                    </span>
                </div>
            </div>

            {/* Info form */}
            <div className="rounded-xl border">
                <div className="border-b px-5 py-3">
                    <h3 className="text-sm font-semibold">Основная информация</h3>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                    <Field
                        label="Имя"
                        defaultValue="Алексей"
                    />
                    <Field
                        label="Фамилия"
                        defaultValue="Иванов"
                    />
                    <Field
                        label="Email"
                        type="email"
                        defaultValue="alexey@example.com"
                        icon={<Mail className="size-4"/>}
                    />
                    <Field
                        label="Телефон"
                        type="tel"
                        defaultValue="+7 900 123-45-67"
                        icon={<Phone className="size-4"/>}
                    />
                    <div className="sm:col-span-2">
                        <Field
                            label="Город"
                            defaultValue="Москва"
                            icon={<MapPin className="size-4"/>}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium">О себе</label>
                        <textarea
                            rows={3}
                            defaultValue="Full-stack разработчик с опытом в React и Node.js."
                            className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>
                <div className="flex justify-end border-t px-5 py-3">
                    <button
                        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
                    >
                        Сохранить
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Проекты', value: '12' },
                    { label: 'Задачи', value: '48' },
                    { label: 'Дней в системе', value: '240' },
                ].map(({ label, value }) => (
                    <div
                        key={label}
                        className="rounded-xl border p-4 text-center"
                    >
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Field({
    label,
    type = 'text',
    defaultValue,
    icon,
}: {
    label: string;
    type?: string;
    defaultValue?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium">{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    defaultValue={defaultValue}
                    className="w-full rounded-md border bg-background py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    style={{ paddingLeft: icon ? '2.25rem' : '0.75rem', paddingRight: '0.75rem' }}
                />
            </div>
        </div>
    );
}
