import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { LayoutDashboard, Settings } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

export const Route = createFileRoute('/_sidebar')({
    component: SidebarLayout,
});

const navItems = [
    { to: '/profile', label: 'Профиль', icon: LayoutDashboard },
    { to: '/settings', label: 'Настройки', icon: Settings },
] as const;

function SidebarLayout() {
    return (
        <div className="flex h-screen bg-background">
            <aside className="flex w-60 shrink-0 flex-col border-r">
                <div className="flex h-14 items-center border-b px-4">
                    <span className="text-sm font-semibold tracking-tight">Сайдбар</span>
                </div>

                <nav className="flex-1 space-y-1 p-2">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            activeProps={{
                                className: 'bg-accent text-accent-foreground',
                            }}
                            inactiveProps={{
                                className: 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                            }}
                            className={cn(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            )}
                        >
                            <Icon className="size-4 shrink-0"/>
                            {label}
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-14 items-center border-b px-6">

                </header>

                <main className="flex-1 overflow-auto p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
