import { createFileRoute } from '@tanstack/react-router';

import { FormExample } from '@/components';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <div className="m-auto w-2/4 py-8">
            <FormExample/>
        </div>
    );
}
