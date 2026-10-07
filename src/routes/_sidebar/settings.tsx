import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_sidebar/settings')({
    component: Settings,
});

function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Настройки
                </h2>
            </div>
        </div>
    );
}
